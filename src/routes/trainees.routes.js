const express = require('express');
const router = express.Router();

const { traineeDetailsMapping } = require("../utils/headerMappings");
const { transformRow } = require("../utils/transformRow");

// Data sanitizers
const {
  toNull,
  toNumberOrNull,
  toDateOrNull
} = require('../utils/sanitizers');

// DB service
const { upsertTrainee } = require('../services/trainees.service');

console.log("trainee route triggered");

router.post("/", async (req, res) => {

  const rows = req.body;

  if (!Array.isArray(rows)) {
    return res.status(400).json({
      message: "Request body must be an array of trainee objects"
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

      // 🔹 Step 1: Map Sheet Headers → DB Fields
      const mappedRow = transformRow(row, traineeDetailsMapping);

      if (!mappedRow.employee_id) {
        failure++;
        console.error("Missing employee_id after mapping");
        continue;
      }

      // 🔹 Step 2: Sanitize Data
      const cleanRow = {

        // Identity
        employee_id: mappedRow.employee_id,
        employee_full_name: toNull(mappedRow.employee_full_name),
        contact_number: toNull(mappedRow.contact_number),
        manager_name: toNull(mappedRow.manager_name),
        uid: toNull(mappedRow.uid),

        // Employment
        working_status: toNull(mappedRow.working_status),
        employment_type: toNull(mappedRow.employment_type),
        work_place: toNull(mappedRow.work_place),
        program: toNull(mappedRow.program),
        role: toNull(mappedRow.role),

        // Email
        personal_email: toNull(mappedRow.personal_email),
        company_email: toNull(mappedRow.company_email),

        // Education
        doj: toDateOrNull(mappedRow.doj),
        qualification: toNull(mappedRow.qualification),
        year_of_passout: toNumberOrNull(mappedRow.year_of_passout),
        home_state: toNull(mappedRow.home_state),
        specialization: toNull(mappedRow.specialization),

        has_mtech_pc: toNull(mappedRow.has_mtech_pc),
        has_mtech_od: toNull(mappedRow.has_mtech_od),

        ctc: toNumberOrNull(mappedRow.ctc),
        learning_portal_access: toNull(mappedRow.learning_portal_access),

        // Exit Info
        last_working_day: toDateOrNull(mappedRow.last_working_day),
        resignation_month: toNull(mappedRow.resignation_month),
        exit_type: toNull(mappedRow.exit_type),
        exit_bucket: toNull(mappedRow.exit_bucket),
        exit_explanation: toNull(mappedRow.exit_explanation),
        employee_contribution: toNull(mappedRow.employee_contribution),

        // Deployment
        deployment_status: toNull(mappedRow.deployment_status),
        deployment_date: toDateOrNull(mappedRow.deployment_date),
        deployment_month: toNull(mappedRow.deployment_month)
      };

      await upsertTrainee(cleanRow);
      success++;

    } catch (error) {
      failure++;
      console.error("❌ Failed trainee:", error.message);
    }
  }

  res.json({
    message: "Trainee sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
