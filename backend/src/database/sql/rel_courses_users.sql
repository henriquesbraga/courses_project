CREATE TABLE IF NOT EXISTS rel_courses_users (
  id_course_tbc INT NOT NULL,
  id_user_tbu INT NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL
);