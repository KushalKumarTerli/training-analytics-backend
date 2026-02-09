const express = require('express');
const router = express.Router();

const { traineePerformanceMapping } = require("../utils/headerMappings");
const { transformRow } = require("../utils/transformRow");

const {
  toNull,
  toNumberOrNull
} = require('../utils/sanitizers');

const { upsertTraineePerformance } = require('../services/traineePerformance.service');

console.log("trainee performance route triggered");

router.post("/", async (req, res) => {

  const rows = req.body;

  if (!Array.isArray(rows)) {
    return res.status(400).json({
      message: "Request body must be an array of performance records"
    });
  }

  if (rows.length === 0) {
    return res.status(400).json({
      message: "Request body is empty"
    });
  }

  let success = 0;
  let failure = 0;

  for (const row of rows) {

    try {

      // STEP 1: Map sheet headers → DB column names
      const mappedRow = transformRow(row, traineePerformanceMapping);

      if (!mappedRow.employee_id) {
        failure++;
        console.error("Missing employee_id after mapping");
        continue;
      }

      // STEP 2: Sanitize
      const cleanRow = {

        employee_id: mappedRow.employee_id,

        training_months: toNull(mappedRow.training_months),
        current_learning: toNull(mappedRow.current_learning),
        completed_courses: toNull(mappedRow.completed_courses),

        online_demos_instructor_count:
          toNumberOrNull(mappedRow.online_demos_instructor_count),

        online_demos_instructor_avg_rating:
          toNumberOrNull(mappedRow.online_demos_instructor_avg_rating),

        online_demos_instructor_platform_count:
          toNumberOrNull(mappedRow.online_demos_instructor_platform_count),

        online_demos_instructor_platform_avg_rating:
          toNumberOrNull(mappedRow.online_demos_instructor_platform_avg_rating),

        offline_demos_count:
          toNumberOrNull(mappedRow.offline_demos_count),

        offline_demos_avg_rating:
          toNumberOrNull(mappedRow.offline_demos_avg_rating),

        fortnight_exam_count:
          toNumberOrNull(mappedRow.fortnight_exam_count),

        fortnight_exam_avg_score:
          toNumberOrNull(mappedRow.fortnight_exam_avg_score),

        course_exam_count:
          toNumberOrNull(mappedRow.course_exam_count),

        course_exam_avg_score:
          toNumberOrNull(mappedRow.course_exam_avg_score),

        combined_exam_avg_score:
          toNumberOrNull(mappedRow.combined_exam_avg_score)
      };

      await upsertTraineePerformance(cleanRow);
      success++;

    } catch (error) {
      failure++;
      console.error("❌ Failed performance:", error.message);
    }
  }

  res.json({
    message: "Performance sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
