const express = require('express');
const router = express.Router();
//importing Data sanitizers
const {
  toNull,
  toNumberOrNull
} = require('../utils/sanitizers');
//importing trainee performance service for DB operations
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
      const cleanRow = { //data sanitization
            employee_id: row.employee_id,

            training_months: toNull(row.training_months),
            current_learning: toNull(row.current_learning),
            completed_courses: toNull(row.completed_courses),

            online_demos_instructor_count:
                toNumberOrNull(row.online_demos_instructor_count),

            online_demos_instructor_avg_rating:
                toNumberOrNull(row.online_demos_instructor_avg_rating),

            online_demos_instructor_platform_count:
                toNumberOrNull(row.online_demos_instructor_platform_count),

            online_demos_instructor_platform_avg_rating:
                toNumberOrNull(row.online_demos_instructor_platform_avg_rating),

            offline_demos_count:
                toNumberOrNull(row.offline_demos_count),

            offline_demos_avg_rating:
                toNumberOrNull(row.offline_demos_avg_rating),

            fortnight_exam_count:
                toNumberOrNull(row.fortnight_exam_count),

            fortnight_exam_avg_score:
                toNumberOrNull(row.fortnight_exam_avg_score),

            course_exam_count:
                toNumberOrNull(row.course_exam_count),

            course_exam_avg_score:
                toNumberOrNull(row.course_exam_avg_score),

            combined_exam_avg_score:
                toNumberOrNull(row.combined_exam_avg_score)
        };

        await upsertTraineePerformance(cleanRow);
       success++;

    } catch (error) {
      failure++;
      console.error("❌ Failed performance:", row.employee_id, error.message);
    }
  }

  res.json({
    message: "Performance sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
