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

main()
    .then(console.log)
    .catch(console.error)

module.exports = router