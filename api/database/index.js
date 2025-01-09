const mongodb = require("mongodb")
const heatmap = require("../heatmap")

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

const getHabits = async () => {
    try {
        const habits = await client.db("habitsdb").collection("habits").find({}).toArray();
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        habits.forEach(habit => {
            habit.calendar = heatmap(habit.dates, formattedDate)
        })
        return habits
    } catch (error) {
        throw new Error('error while getting habits')
    }

}

main()
    .then(console.log)
    .catch(console.error)

module.exports = { getHabits } 