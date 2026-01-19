const express = require('express') 
const db = require('./config/db'); // important: initializes DB connection

const healthroutes = require('./routes/health.routes'); //import health routes

const  app = express();

app.use(express.json())
app.use('/health', healthroutes); //use health routes

// Root endpoint

app.get("/", (req, res) => {
    res.send({message: "Training Analytics Backend is running" });
})

module.exports = app;