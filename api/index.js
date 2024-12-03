const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");
const routes = require('./routes')

const router = express.Router();
const app = express();

router.get("/", (_req, res) => {
    res.send("Welcome to the Habits API!")
});

// middleware
app.use(cors());

// routes 
app.use('/', router);
app.use('/habits', routes);

// netlify serverless function
app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);
