const express = require('express');
const db = require('./config/db'); // DB connection initialized

const healthroutes = require('./routes/health.routes');
//importing routes
const traineeRoutes = require('./routes/trainees.routes');
console.log("Trainee Routes Loaded:", typeof traineeRoutes);

const performanceRoutes = require('./routes/traineePerformance.routes');
const demoRoutes = require('./routes/demoSessions.routes');

const analyticsRoutes = require("./routes/analytics.routes"); //Analytics route for homepage trainees list


const app = express();

app.use(express.json());

//register routes
app.use('/health', healthroutes); // Health check route

app.use('/trainees', traineeRoutes);// Trainee data sync route
app.use('/trainee-performance', performanceRoutes);//Trainee performance data sync route
app.use('/demo-sessions', demoRoutes); //Demo sessions data sync route

app.use("/analytics", analyticsRoutes); //Analytics route for homepage trainees list

app.get("/", (req, res) => {
    res.send({ message: "Training Analytics Backend is running" });
});

module.exports = app;
