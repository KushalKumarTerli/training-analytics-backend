const { db } = require("../config/db");

const getTraineesList = (page, limit) => {
  const offset = (page - 1) * limit;

  const sql = `
    SELECT
      t.employee_full_name,
      t.employee_id,
      t.doj,
      ROUND((julianday('now') - julianday(t.doj)) / 30, 1) AS training_months,
      t.home_state,
      t.qualification,

      p.current_learning,
      p.completed_courses,
      p.online_demos_instructor_platform_count,
      p.online_demos_instructor_platform_avg_rating,
      p.offline_demos_count,
      p.offline_demos_avg_rating,
      p.fortnight_exam_count,
      p.fortnight_exam_avg_score,

      COUNT(d.id) AS total_demo_sessions,
      MAX(d.demo_date) AS last_demo_date

    FROM trainees t

    LEFT JOIN trainee_performance_summary p
      ON t.employee_id = p.employee_id

    LEFT JOIN demo_sessions d
      ON t.employee_id = d.employee_id

    WHERE t.working_status = 'Working'

    GROUP BY t.employee_id

ORDER BY 
  p.online_demos_instructor_platform_avg_rating IS NULL,
  p.online_demos_instructor_platform_avg_rating DESC

LIMIT ? OFFSET ?


  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [limit, offset], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          page,
          limit,
          count: rows.length,
          data: rows
        });
      }
    });
  });
};

module.exports = { getTraineesList };
