const { db } = require('../config/db');

const insertDemoSession = (row) => {
  const sql = `
    INSERT INTO demo_sessions (
      employee_id,
      instructor_name,
      demo_date,
      demo_time,
      demo_status,
      course_id,
      course_name,
      topic_id,
      topic_name,
      remarks,
      panel_members,
      avg_rating,
      greeting_warmth,
      recap,
      agenda_setting,
      slide_usage,
      transition_between_concepts,
      content_familiarity,
      key_concepts_covered,
      usage_of_examples,
      accuracy_of_information,
      hands_on_coding,
      problem_solving_approach,
      time_management,
      pace_of_delivery,
      slide_transitions_flow,
      voice_modulation,
      language_clarity,
      body_language,
      fluency,
      interactive_engagement,
      encourages_participation,
      session_closure,
      grooming_dressing,
      classroom_behaviour,
      openness_to_feedback,
      source_sheet
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    row.employee_id,
    row.instructor_name,
    row.demo_date,
    row.demo_time,
    row.demo_status,
    row.course_id,
    row.course_name,
    row.topic_id,
    row.topic_name,
    row.remarks,
    row.panel_members,
    row.avg_rating,
    row.greeting_warmth,
    row.recap,
    row.agenda_setting,
    row.slide_usage,
    row.transition_between_concepts,
    row.content_familiarity,
    row.key_concepts_covered,
    row.usage_of_examples,
    row.accuracy_of_information,
    row.hands_on_coding,
    row.problem_solving_approach,
    row.time_management,
    row.pace_of_delivery,
    row.slide_transitions_flow,
    row.voice_modulation,
    row.language_clarity,
    row.body_language,
    row.fluency,
    row.interactive_engagement,
    row.encourages_participation,
    row.session_closure,
    row.grooming_dressing,
    row.classroom_behaviour,
    row.openness_to_feedback,
    row.source_sheet
  ];

  return new Promise((resolve, reject) => {
    db.run(sql, values, function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = { insertDemoSession };
