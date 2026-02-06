PRAGMA foreign_keys = ON;

-- =========================
-- 1. TRAINEES (Identity)
-- =========================
CREATE TABLE IF NOT EXISTS trainees (
  employee_id TEXT PRIMARY KEY,
  employee_full_name TEXT,
  contact_number TEXT,
  manager_name TEXT,
  uid TEXT,

  working_status TEXT,
  employment_type TEXT,
  work_place TEXT,
  program TEXT,
  role TEXT,

  personal_email TEXT,
  company_email TEXT,

  doj DATE,
  qualification TEXT,
  year_of_passout INTEGER,
  home_state TEXT,
  specialization TEXT,

  has_mtech_pc TEXT,
  has_mtech_od TEXT,

  ctc INTEGER,
  learning_portal_access TEXT,

  last_working_day DATE,
  resignation_month TEXT,
  exit_type TEXT,
  exit_bucket TEXT,
  exit_explanation TEXT,
  employee_contribution TEXT,

  deployment_status TEXT,
  deployment_date DATE,
  deployment_month TEXT,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 2. TRAINEE PERFORMANCE SUMMARY
-- =========================
CREATE TABLE IF NOT EXISTS trainee_performance_summary (
  employee_id TEXT PRIMARY KEY,


  training_months TEXT,
  current_learning TEXT,
  completed_courses TEXT,

  online_demos_instructor_count INTEGER,
  online_demos_instructor_avg_rating REAL,

  online_demos_instructor_platform_count INTEGER,
  online_demos_instructor_platform_avg_rating REAL,

  offline_demos_count INTEGER,
  offline_demos_avg_rating REAL,

  fortnight_exam_count INTEGER,
  fortnight_exam_avg_score REAL,

  course_exam_count INTEGER,
  course_exam_avg_score REAL,

  combined_exam_avg_score REAL,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (employee_id) REFERENCES trainees(employee_id)
);

-- =========================
-- 3. DEMO SESSIONS (Raw Records)
-- =========================
CREATE TABLE IF NOT EXISTS demo_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  employee_id TEXT,
  instructor_name TEXT,

  demo_date DATE,
  demo_time TEXT,
  demo_status TEXT,

  course_id TEXT,
  course_name TEXT,
  topic_id TEXT,
  topic_name TEXT,

  remarks TEXT,
  panel_members TEXT,

  avg_rating REAL,

  greeting_warmth INTEGER,
  recap INTEGER,
  agenda_setting INTEGER,
  slide_usage INTEGER,
  transition_between_concepts INTEGER,

  content_familiarity INTEGER,
  key_concepts_covered INTEGER,
  usage_of_examples INTEGER,
  accuracy_of_information INTEGER,

  hands_on_coding INTEGER,
  problem_solving_approach INTEGER,

  time_management INTEGER,
  pace_of_delivery INTEGER,
  slide_transitions_flow INTEGER,

  voice_modulation INTEGER,
  language_clarity INTEGER,
  body_language INTEGER,
  fluency INTEGER,

  interactive_engagement INTEGER,
  encourages_participation INTEGER,

  session_closure INTEGER,
  grooming_dressing INTEGER,
  classroom_behaviour INTEGER,
  openness_to_feedback INTEGER,

  source_sheet TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (employee_id) REFERENCES trainees(employee_id)
);
