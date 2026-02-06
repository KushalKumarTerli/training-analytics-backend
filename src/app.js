const express = require('express');
const db = require('./config/db'); // DB connection initialized

const healthroutes = require('./routes/health.routes');

const  syncRoutes = require('./routes/sync.routes');

const app = express();

app.use(express.json());

app.use('/health', healthroutes);

app.use('/sync', syncRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Training Analytics Backend is running" });
});

module.exports = app;
