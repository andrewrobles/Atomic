const mongodb = require('mongodb')
const heatmap = require('../heatmap')
const { getToday } = require('../utils')

const client = new mongodb.MongoClient(process.env.ATLAS_URI)

async function main() {
    try {
        console.log("Connecting to MongoDB...")
        await client.connect()
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }

    return 'done.';
}

const getHabits = async (email, timezone) => {
    try {
        const formattedDate = getToday(timezone)
        const userCollection = client.db("habitsdb").collection("users")
        const user = await userCollection.findOne({ email });

        if (user.habits) {
            const habits = user.habits
            habits.forEach(habit => {
                habit.calendar = heatmap(habit.dates, formattedDate, habit.started)
            })
            return habits
        } else {
            return []
        }
    } catch (error) {
        throw new Error('error while getting habits:', error)
    }
}

const createHabit = async (name, email, timezone) => {
    try {
        const habitId = new mongodb.ObjectId() // Generate a unique ID for the habit

        // Find the user by email
        const userCollection = client.db("habitsdb").collection("users")
        const user = await userCollection.findOne({ email })

        if (!user) {
            throw new Error(`User with email ${email} not found`)
        }

        // Create a new habit object
        const started = getToday(timezone)
        const newHabit = { _id: habitId, name, dates: [], started}

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

const deleteHabit = async (email, habitId) => {
    try {
        // Remove the habit with the specified ID from the user's habits array
        const mongoId = new mongodb.ObjectId(habitId) // Assuming `_id` is an ObjectId
        const result = await client.db("habitsdb").collection("users").updateOne(
            { email },
            { $pull: { habits: { _id: mongoId } } }
        );

        if (result.modifiedCount === 0) {
            throw new Error("Habit not found or already deleted")
        }

        return result;
    } catch (error) {
        console.error("Error while deleting habit:", error)
        throw new Error("Error while deleting habit")
    }
}

const markHabit = async (email, habitId, done, date) => {
    try {
        let updateOperation;

        if (done) {
            // Add the date to the habit's `dates` array
            updateOperation = {
                $addToSet: { "habits.$.dates": date }
            };
        } else {
            // Remove the date from the habit's `dates` array
            updateOperation = {
                $pull: { "habits.$.dates": date }
            };
        }

        // Update the specific habit within the user's habits array
        const result = await client.db("habitsdb").collection("users").updateOne(
            { email, "habits._id": new mongodb.ObjectId(habitId) }, // Match user by email and habit by _id
            updateOperation
        );

        if (result.modifiedCount === 0) {
            throw new Error("Habit not found or date not updated");
        }

        return result;
    } catch (error) {
        console.error("Error when marking habit:", error);
        throw new Error("Error when marking habit");
    }
};

const getUser = async (email) => {
    try {
        const result = await client.db('habitsdb').collection('users').findOneAndUpdate(
            { email },
            { $setOnInsert: { email } },
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