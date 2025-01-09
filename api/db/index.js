const mongodb = require("mongodb")
const heatmap = require("../cal")

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
        throw new Error('error while getting habits:', error)
    }

}

const createHabit = async (name) => {
    try {
        const result = await client.db("habitsdb").collection("habits").insertOne({ name, dates: [] });
        return result
    } catch (error) {
        throw new Error('error while creating habit:', error)
    }
}

const deleteHabit = async (id) => {
    try {
        await client.db("habitsdb").collection("habits").deleteOne({ _id: new mongodb.ObjectId(id) });
    } catch (error) {
        throw new Error('error deleting habit:', error)
    }
}

const markHabit = async (id, done, date) => {
    try {
        let updateOperation
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
        return result
    } catch (error) {
        throw new Error('error when marking habit: ', error)
    }
}

main()
    .then(console.log)
    .catch(console.error)

module.exports = { getHabits, createHabit, deleteHabit, markHabit } 