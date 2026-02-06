const {db} = require('../config/db'); // DB connection initialized

//upsert function start
const upsertTraineePerformance = (row) => {
  const sql = `
    INSERT INTO trainee_performance_summary (
      employee_id,
      training_months,
      current_learning,
      completed_courses,
      online_demos_instructor_count,
      online_demos_instructor_avg_rating,
      online_demos_instructor_platform_count,
      online_demos_instructor_platform_avg_rating,
      offline_demos_count,
      offline_demos_avg_rating,
      fortnight_exam_count,
      fortnight_exam_avg_score,
      course_exam_count,
      course_exam_avg_score,
      combined_exam_avg_score
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    row.employee_id,
    row.training_months,
    row.current_learning,
    row.completed_courses,
    row.online_demos_instructor_count,
    row.online_demos_instructor_avg_rating,
    row.online_demos_instructor_platform_count,
    row.online_demos_instructor_platform_avg_rating,
    row.offline_demos_count,
    row.offline_demos_avg_rating,
    row.fortnight_exam_count,
    row.fortnight_exam_avg_score,
    row.course_exam_count,
    row.course_exam_avg_score,
    row.combined_exam_avg_score
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function(err){
        if(err){
            console.error("❌ Error upserting trainee performance:", err.message);
            reject(err)
        } else {
            resolve();
        }
    })
})
};


//function end

module.exports = {upsertTraineePerformance}