CREATE TABLE IF NOT EXISTS tb_users_tbu (
    id_user_tbu SERIAL PRIMARY KEY,
    name_user_tbu VARCHAR(255) NOT NULL,
    email_user_tbu VARCHAR(255) UNIQUE NOT NULL,
    password_user_tbu VARCHAR(255) NOT NULL,
    is_active_user_tbu BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL
)