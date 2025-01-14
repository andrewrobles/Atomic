const express = require("express");
const router = express.Router();
const { validateIdToken, getEmailFromIdToken } = require('../utils')
const { getHabits, createHabit, deleteHabit, markHabit, getUser } = require('../actions')

router.get("/", validateIdToken, async (req, res) => {
    try {
        const idToken = getIdToken(req)
        const email = await getEmailFromIdToken(idToken)
        await getUser(email)
        const timezone = req.headers.timezone
        const habits = await getHabits(email, timezone)
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
})

router.post("/", validateIdToken, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const idToken = getIdToken(req)
        const email = await getEmailFromIdToken(idToken)
        const timezone = req.headers.timezone
        const result = await createHabit(name, email, timezone)
        res.status(201).json({ message: "Habit created successfully", id: result.insertedId });
    } catch (err) {
        console.error("Error creating habit:", error);
        res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
});

router.delete("/:id", validateIdToken, async (req, res) => {
    try {
        const idToken = getIdToken(req)
        const email = await getEmailFromIdToken(idToken)
        await deleteHabit(email, req.params.id)
        res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        console.error("Error deleting habit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.patch("/:id/:date", validateIdToken, async (req, res) => {
    const { done } = req.body;
    const { id, date } = req.params;

    if (typeof done !== 'boolean') {
        return res.status(400).json({ error: "'done' must be a boolean value" });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: "Date must be in YYYY-MM-DD format" });
    }

    try {
        const idToken = getIdToken(req)
        const email = await getEmailFromIdToken(idToken)
        const result = await markHabit(email, id, done, date)

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json({ message: "Habit completion status updated successfully" });
    } catch (error) {
        console.error("Error updating habit completion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const getIdToken = req => {
    return req.headers.authorization.split("Bearer ")[1]
}

module.exports = router