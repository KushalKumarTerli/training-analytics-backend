const {db} = require('../config/db');db; // DB connection initialized

//upsert function start
const upsertTrainee = (row) => {
    const sql = `
    INSERT INTO trainees (
      employee_id,
      employee_full_name,
      contact_number,
      manager_name,
      working_status,
      employment_type,
      work_place,
      program,
      role,
      personal_email,
      company_email,
      doj,
      qualification,
      year_of_passout,
      home_state,
      specialization,
      has_mtech_pc,
      has_mtech_od,
      ctc,
      learning_portal_access,
      deployment_status,
      deployment_date,
      deployment_month
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ON CONFLICT(employee_id) DO UPDATE SET
      employee_full_name = excluded.employee_full_name,
      contact_number = excluded.contact_number,
      manager_name = excluded.manager_name,
      working_status = excluded.working_status,
      employment_type = excluded.employment_type,
      work_place = excluded.work_place,
      program = excluded.program,
      role = excluded.role,
      personal_email = excluded.personal_email,
      company_email = excluded.company_email,
      doj = excluded.doj,
      qualification = excluded.qualification,
      year_of_passout = excluded.year_of_passout,
      home_state = excluded.home_state,
      specialization = excluded.specialization,
      has_mtech_pc = excluded.has_mtech_pc,
      has_mtech_od = excluded.has_mtech_od,
      ctc = excluded.ctc,
      learning_portal_access = excluded.learning_portal_access,
      deployment_status = excluded.deployment_status,
      deployment_date = excluded.deployment_date,
      deployment_month = excluded.deployment_month,
      updated_at = CURRENT_TIMESTAMP
    `
;

const values = [
    row.employee_id,
    row.employee_full_name,
    row.contact_number,
    row.manager_name,
    row.working_status,
    row.employment_type,
    row.work_place,
    row.program,
    row.role,
    row.personal_email,
    row.company_email,
    row.doj,
    row.qualification,
    row.year_of_passout,
    row.home_state,
    row.specialization,
    row.has_mtech_pc,
    row.has_mtech_od,
    row.ctc,
    row.learning_portal_access,
    row.deployment_status,
    row.deployment_date,
    row.deployment_month
  ];


  return new Promise((resolve, reject) => {
    db.run(sql, values, function(err){
        if(err){
            console.error("❌ Error upserting trainee:", err.message);

            reject(err)
        }
        else{
            resolve();
        }
    })

  })
}

//function end

module.exports = {upsertTrainee}