const express = require("express");
const router = express.Router();

const { getTraineesList } = require("../services/analytics.service");

// GET /analytics/trainees
router.get("/trainees", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getTraineesList(page, limit);

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching trainees list:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
