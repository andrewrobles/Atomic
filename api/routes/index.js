const express = require("express");
const router = express.Router();
const {validateIdToken, getEmailFromIdToken } = require('../auth')
const { getHabits, createHabit, deleteHabit, markHabit } = require('../collections')


router.get("/", validateIdToken, async (req, res) => {
    try {
        const habits = await getHabits()
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", validateIdToken, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const result = await createHabit(name)
        res.status(201).json({ message: "Habit created successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error creating habit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", validateIdToken, async (req, res) => {
    try {
        await deleteHabit(req.params.id)
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
        const result = await markHabit(id, done, date)

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json({ message: "Habit completion status updated successfully" });
    } catch (error) {
        console.error("Error updating habit completion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router