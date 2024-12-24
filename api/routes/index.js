const express = require("express");
const mongodb = require("mongodb")
const router = express.Router();

const client = new mongodb.MongoClient(process.env.ATLAS_URI);

async function main() {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }

    return 'done.';
}

router.get("/", async (req, res) => {
    const { password } = req.query;

    if (password !== process.env.PASSWORD) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing password" });
    }

    try {
        const habits = await client.db("habitsdb").collection("habits").find({}).toArray();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const { password } = req.query;
    const { name } = req.body;

    if (password !== process.env.PASSWORD) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing password" });
    }

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const result = await client.db("habitsdb").collection("habits").insertOne({ name });
        res.status(201).json({ message: "Habit created successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error creating habit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { password } = req.query;

    if (password !== process.env.PASSWORD) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing password" });
    }

    try {
        await client.db("habitsdb").collection("habits").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        console.error("Error deleting habit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/:id/:date", async (req, res) => {
    const { password } = req.query;
    const { done } = req.body;
    const { id, date } = req.params;

    if (password !== process.env.PASSWORD) {
        return res.status(401).json({ error: "Unauthorized: Invalid or missing password" });
    }

    if (typeof done !== 'boolean') {
        return res.status(400).json({ error: "'done' must be a boolean value" });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ error: "Date must be in YYYY-MM-DD format" });
    }

    try {
        let updateOperation;
        if (done) {
            updateOperation = {
                $addToSet: { dates: date }
            };
        } else {
            updateOperation = {
                $pull: { dates: date }
            };
        }

        const result = await client.db("habitsdb").collection("habits").updateOne(
            { _id: new mongodb.ObjectId(id) },
            updateOperation
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Habit not found" });
        }

        res.status(200).json({ message: "Habit completion status updated successfully" });
    } catch (error) {
        console.error("Error updating habit completion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// TODO: Edit habit `PATCH /habits/<id> { "name": <string> }`
// TODO: Habit detail `GET /habits/<id>`

main()
    .then(console.log)
    .catch(console.error)

module.exports = router