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
    const habits = await client.db("habitsdb").collection("habits").find({}).toArray()
    res.status(200).json(habits);
});

main()
    .then(console.log)
    .catch(console.error)

module.exports = router