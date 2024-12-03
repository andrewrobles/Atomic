const mongodb = require("mongodb")

const client = new mongodb.MongoClient(process.env.ATLAS_URI);

async function connect() {
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

let db = client.db("habitsdb")

module.exports = { db, connect} 