import postgres from "postgres";

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;


const sql = postgres({
  hostname: DATABASE_HOST || "localhost",
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: Number(DATABASE_PORT),
});

export default sql;
