CREATE TABLE IF NOT EXISTS rel_courses_users (
  id_rel_courses_users SERIAL PRIMARY KEY,
  id_course_tbc INT NOT NULL,
  id_user_tbu INT NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT unique_user_course UNIQUE (id_course_tbc, id_user_tbu)
);