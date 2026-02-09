const express = require('express');
const router = express.Router();

const { demoSessionsMapping } = require("../utils/headerMappings");
const { transformRow } = require("../utils/transformRow");
const { resolveEmployeeId } = require("../utils/resolveEmployeeId");

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

      // STEP 1: Map sheet headers → DB fields
      const mappedRow = transformRow(row, demoSessionsMapping);

      if (!mappedRow.uid) {
        failure++;
        console.error("Missing UID after mapping");
        continue;
      }

      // STEP 2: Resolve employee_id using UID
      const employeeId = await resolveEmployeeId(mappedRow.uid);

      if (!employeeId) {
        failure++;
        console.error("UID not found in trainees table:", mappedRow.uid);
        continue;
      }

      // STEP 3: Sanitize
      const cleanRow = {

        employee_id: employeeId,
        instructor_name: toNull(mappedRow.instructor_name),
        demo_date: toDateOrNull(mappedRow.demo_date),
        demo_time: toNull(mappedRow.demo_time),
        demo_status: toNull(mappedRow.demo_status),
        course_id: toNull(mappedRow.course_id),
        course_name: toNull(mappedRow.course_name),
        topic_id: toNull(mappedRow.topic_id),
        topic_name: toNull(mappedRow.topic_name),
        remarks: toNull(mappedRow.remarks),
        panel_members: toNull(mappedRow.panel_members),
        avg_rating: toNumberOrNull(mappedRow.avg_rating),

        greeting_warmth: toNumberOrNull(mappedRow.greeting_warmth),
        recap: toNumberOrNull(mappedRow.recap),
        agenda_setting: toNumberOrNull(mappedRow.agenda_setting),
        slide_usage: toNumberOrNull(mappedRow.slide_usage),
        transition_between_concepts: toNumberOrNull(mappedRow.transition_between_concepts),

        content_familiarity: toNumberOrNull(mappedRow.content_familiarity),
        key_concepts_covered: toNumberOrNull(mappedRow.key_concepts_covered),
        usage_of_examples: toNumberOrNull(mappedRow.usage_of_examples),
        accuracy_of_information: toNumberOrNull(mappedRow.accuracy_of_information),

        hands_on_coding: toNumberOrNull(mappedRow.hands_on_coding),
        problem_solving_approach: toNumberOrNull(mappedRow.problem_solving_approach),

        time_management: toNumberOrNull(mappedRow.time_management),
        pace_of_delivery: toNumberOrNull(mappedRow.pace_of_delivery),
        slide_transitions_flow: toNumberOrNull(mappedRow.slide_transitions_flow),

        voice_modulation: toNumberOrNull(mappedRow.voice_modulation),
        language_clarity: toNumberOrNull(mappedRow.language_clarity),
        body_language: toNumberOrNull(mappedRow.body_language),
        fluency: toNumberOrNull(mappedRow.fluency),

        interactive_engagement: toNumberOrNull(mappedRow.interactive_engagement),
        encourages_participation: toNumberOrNull(mappedRow.encourages_participation),

        session_closure: toNumberOrNull(mappedRow.session_closure),
        grooming_dressing: toNumberOrNull(mappedRow.grooming_dressing),
        classroom_behaviour: toNumberOrNull(mappedRow.classroom_behaviour),
        openness_to_feedback: toNumberOrNull(mappedRow.openness_to_feedback),

        source_sheet: toNull(mappedRow.source_sheet)
      };

      await insertDemoSession(cleanRow);
      success++;

    } catch (error) {
      failure++;
      console.error("❌ Demo insert failed:", error.message);
    }
  }

  res.json({
    message: "Demo sessions sync completed",
    successCount: success,
    failureCount: failure
  });
});

module.exports = router;
