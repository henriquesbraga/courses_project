import postgres from "postgres";

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_HOST,
  NODE_ENV,
} = process.env;


const sql = postgres({
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: Number(DATABASE_PORT),
  ...(NODE_ENV === "production" && { hostname: DATABASE_HOST }),
});

export default sql;
