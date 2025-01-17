
if (require.main === module) {
    require('dotenv').config()
}
const cors = require("cors")
const express = require("express")
const serverless = require("serverless-http")
const routes = require("./routes")

const app = express()
const router = express.Router()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
router.get("/", (_req, res) => {
    res.send("Welcome to the Habits API!")
})

app.use("/", router)
app.use("/habits", routes)

// Serverless-specific route
app.use("/.netlify/functions/app", router)

// Export handler for serverless
module.exports.handler = serverless(app)

// Local server setup
if (require.main === module) {
    const PORT = process.env.PORT || 8888 
    app.listen(PORT, () => {
        console.log(`Server running locally at http://localhost:${PORT}`)
    })
}