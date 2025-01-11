CREATE TABLE IF NOT EXISTS tb_courses_tbc (
    id_course_tbc SERIAL PRIMARY KEY,
    title_course_tbc VARCHAR(255) NOT NULL,
    description_course_tbc VARCHAR(255) NOT NULL,
    workload_course_tbc INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
)