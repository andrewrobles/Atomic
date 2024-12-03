const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

const router = express.Router();
const app = express();

// middleware
app.use(cors());

// routes 
app.use('/', require('./routes/index'));
app.use('/habits', require('./routes/habits'));

// netlify serverless function
app.use('/.netlify/functions/app', router);

module.exports.handler = serverless(app);
