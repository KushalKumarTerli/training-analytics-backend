const express = require('express');
const db = require('./config/db'); // DB connection initialized

const healthroutes = require('./routes/health.routes');
//importing routes
const traineeRoutes = require('./routes/trainees.routes');
const performanceRoutes = require('./routes/traineePerformance.routes');
const demoRoutes = require('./routes/demoSessions.routes');


const app = express();

app.use(express.json());

//register routes
app.use('/health', healthroutes); // Health check route

app.use('/sync/trainees', traineeRoutes);// Trainee data sync route
app.use('/sync/trainee-performance', performanceRoutes);//Trainee performance data sync route
app.use('/sync/demo-sessions', demoRoutes); //Demo sessions data sync route

app.get("/", (req, res) => {
    res.send({ message: "Training Analytics Backend is running" });
});

module.exports = app;
