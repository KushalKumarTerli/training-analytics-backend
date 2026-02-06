const express = require('express');
const router = express.Router();

const { insertDemoSession } = require('../services/demoSessions.service');

const {
  toNull,
  toNumberOrNull,
  toDateOrNull
} = require('../utils/sanitizers');

router.post("/", async (req, res) => {

  const rows = req.body;

  if (!Array.isArray(rows)) {
    return res.status(400).json({
      message: "Request body must be an array"
    });
  }

  let success = 0;
  let failure = 0;

  for (const row of rows) {
    try {

      const cleanRow = {
        employee_id: row.employee_id,
        instructor_name: toNull(row.instructor_name),
        demo_date: toDateOrNull(row.demo_date),
        demo_time: toNull(row.demo_time),
        demo_status: toNull(row.demo_status),
        course_id: toNull(row.course_id),
        course_name: toNull(row.course_name),
        topic_id: toNull(row.topic_id),
        topic_name: toNull(row.topic_name),
        remarks: toNull(row.remarks),
        panel_members: toNull(row.panel_members),
        avg_rating: toNumberOrNull(row.avg_rating),
        greeting_warmth: toNumberOrNull(row.greeting_warmth),
        recap: toNumberOrNull(row.recap),
        agenda_setting: toNumberOrNull(row.agenda_setting),
        slide_usage: toNumberOrNull(row.slide_usage),
        transition_between_concepts: toNumberOrNull(row.transition_between_concepts),
        content_familiarity: toNumberOrNull(row.content_familiarity),
        key_concepts_covered: toNumberOrNull(row.key_concepts_covered),
        usage_of_examples: toNumberOrNull(row.usage_of_examples),
        accuracy_of_information: toNumberOrNull(row.accuracy_of_information),
        hands_on_coding: toNumberOrNull(row.hands_on_coding),
        problem_solving_approach: toNumberOrNull(row.problem_solving_approach),
        time_management: toNumberOrNull(row.time_management),
        pace_of_delivery: toNumberOrNull(row.pace_of_delivery),
        slide_transitions_flow: toNumberOrNull(row.slide_transitions_flow),
        voice_modulation: toNumberOrNull(row.voice_modulation),
        language_clarity: toNumberOrNull(row.language_clarity),
        body_language: toNumberOrNull(row.body_language),
        fluency: toNumberOrNull(row.fluency),
        interactive_engagement: toNumberOrNull(row.interactive_engagement),
        encourages_participation: toNumberOrNull(row.encourages_participation),
        session_closure: toNumberOrNull(row.session_closure),
        grooming_dressing: toNumberOrNull(row.grooming_dressing),
        classroom_behaviour: toNumberOrNull(row.classroom_behaviour),
        openness_to_feedback: toNumberOrNull(row.openness_to_feedback),
        source_sheet: toNull(row.source_sheet)
      };

      await insertDemoSession(cleanRow);
      success++;

    } catch (error) {
      failure++;
      console.error("❌ Demo insert failed:", row.employee_id, error.message);
    }
  }

  res.json({
    message: "Demo sessions sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
