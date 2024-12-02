const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
const mongodb = require("mongodb")
const app = express();
const router = express.Router();

const client = new mongodb.MongoClient(process.env.ATLAS_URI);

async function main() {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit if the database connection fails
    }

    return 'done.';
}

router.get("/habits", async (req, res) => {
    const habits = await client.db("habitsdb").collection("habits").find({}).toArray()
    res.status(200).json(habits);
});

router.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});
router.get("/", (req, res) => {
    res.send("Welcome to the Habits API!")
});

main()
    .then(console.log)
    .catch(console.error)

app.use(cors());
app.use('/', router);
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
