const express = require('express');

const router = express.Router();

const {upsertTraineePerformance} = require('../services/traineePerformance.service');

const {upsertTrainee} = require('../services/trainees.service');

console.log("Sync route triggered");
// POST /sync/trainee-performance
router.post("/trainee-performance", async(req, res) => {
    
    const rows = req.body; // Expecting an array of trainee performance objects
    
    let success = 0;
    let failure = 0;
    
    if (rows.length === 0) {
        return res.status(400).json({
            message: "Request body is empty." });
    }


    if (!Array.isArray(rows)) { 
        return res.status(400).json({ message: "Request body must be an array of trainee performance objects" });
    }
    
   for (const row of rows){
    try{
        await upsertTraineePerformance(row);
        success++;
    } catch (error){
        failure++;
        console.error("❌ Failed to sync row for employee_id:", row.employee_id, "Error:", error.message);
    }   
   }
    res.json({
        message: "Sync completed",
        successCount: success,
        failureCount: failure 
    });
});

// POST /sync/trainees
router.post("/trainees", async(req, res) => {
    const rows = req.body; // Expecting an array of trainee objects

    let success = 0
    let failure = 0;

    if(rows.length ===0){
        return res.status(400).json({
            message:"Request body is empty."
        })
    }

    if(!Array.isArray(rows)){
        return res.status(400).json({
            message : "Request body must be an array of trainee objects"
        })

    }

    for(const row of rows){
        try{
            await upsertTrainee(row);
            success++;
        } catch(error){
            failure++;
            console.error("❌ Failed to sync trainee with employee_id:", row.employee_id, "Error:", error.message);
        }
    }
        res.json({
            message: "Trainee Sync completed",
            successCount: success,
            failureCount: failure
        });


})


module.exports = router;