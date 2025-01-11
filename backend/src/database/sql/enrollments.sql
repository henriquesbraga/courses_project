CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);