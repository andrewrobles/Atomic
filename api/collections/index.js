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
        habits.forEach(habit => {
            habit.calendar = heatmap(habit.dates, getTodayDateString())
        })
        return habits
    } catch (error) {
        throw new Error('error while getting habits:', error)
    }
}

const getTodayDateString = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

const createHabit = async (name, email) => {
    try {
        // Find the user by email
        const userCollection = client.db("habitsdb").collection("users")
        const user = await userCollection.findOne({ email });

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        // Create a new habit object
        const newHabit = { name, dates: [] };

        // Update the user's habits array
        const result = await userCollection.updateOne(
            { email },
            { $push: { habits: newHabit } }
        )

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

const getUser = async (email) => {
    try {
        const result = await client.db('habitsdb').collection('users').findOneAndUpdate(
            { email },
            { $setOnInsert: { email}},
            { upsert: true, returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error('error when getting user:', error)
    }
}

main()
    .then(console.log)
    .catch(console.error)

module.exports = { getHabits, createHabit, deleteHabit, markHabit, getUser } 