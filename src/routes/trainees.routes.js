const express = require('express');
const router = express.Router();
//importing Data sanitizers
const {
  toNull,
  toNumberOrNull
} = require('../utils/sanitizers');

//importing trainee service for DB operations
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

  let success = 0;//counters for success and failure
  let failure = 0;

  for (const row of rows) {
    if (!row.employee_id) { //Because foreign key + primary key depend on this.
            failure++;
            console.error("Missing employee_id");
            continue;
        }
    try {
      const cleanRow = {
            employee_id: row.employee_id,
            employee_full_name: toNull(row.employee_full_name),
            contact_number: toNull(row.contact_number),
            manager_name: toNull(row.manager_name),

            working_status: toNull(row.working_status),
            employment_type: toNull(row.employment_type),
            work_place: toNull(row.work_place),
            program: toNull(row.program),
            role: toNull(row.role),

            personal_email: toNull(row.personal_email),
            company_email: toNull(row.company_email),

            doj: toDateOrNull(row.doj),

            qualification: toNull(row.qualification),
            year_of_passout: toNumberOrNull(row.year_of_passout),
            home_state: toNull(row.home_state),
            specialization: toNull(row.specialization),

            has_mtech_pc: toNull(row.has_mtech_pc),
            has_mtech_od: toNull(row.has_mtech_od),

            ctc: toNumberOrNull(row.ctc),
            learning_portal_access: toNull(row.learning_portal_access),

            deployment_status: toNull(row.deployment_status),
            deployment_date: toDateOrNull(row.deployment_date),
            deployment_month: toNull(row.deployment_month)
          };

      await upsertTrainee(cleanRow);
      success++;

    } catch (error) {
      failure++;
      console.error("❌ Failed trainee:", row.employee_id, error.message);
    }
  } //end of for loop

  res.json({
    message: "Trainee sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
