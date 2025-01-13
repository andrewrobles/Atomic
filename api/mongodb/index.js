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

const getHabits = async (timezone) => {
    try {
        const habits = await client.db("habitsdb").collection("habits").find({}).toArray();
        const formattedDate = getToday(timezone)
        habits.forEach(habit => {
            habit.calendar = heatmap(habit.dates, formattedDate)
        })
        return habits
    } catch (error) {
        throw new Error('error while getting habits:', error)
    }
}

const getToday = timezone => {
    const today = new Date();

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(today)
    const yyyy = parts.find(part => part.type === 'year').value
    const mm = parts.find(part => part.type === 'month').value
    const dd = parts.find(part => part.type === 'day').value

    const formattedDate = `${yyyy}-${mm}-${dd}`
    return formattedDate
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