import { log } from "console";
import sql from "./connection";
import fs from "fs/promises";
import path from "path";

async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = ${tableName}
      ) AS exists;
    `;

    return result[0].exists;
  } catch (error) {
    console.error("Error verifying if table exists: ", error);
    throw error;
  }
}

async function executeSQLFile(filePath: string) {
  const isTableCreated = await tableExists(filePath.split(".")[0]);

  if (isTableCreated) {
    return;
  }

  try {
    const absolutePath = path.resolve(__dirname, `./sql/${filePath}`);
    const sqlContent = await fs.readFile(absolutePath, "utf-8");
    const commands = sqlContent.split(";").filter((cmd) => cmd.trim() !== "");

    await sql.begin(async (trx) => {
      for (const command of commands) {
        await trx.unsafe(command.trim());
      }
    });

    console.log(`Transaction ${filePath} successfully proccessed.`);
  } catch (error) {
    console.error(`Error processing transaction ${filePath}:`, error);
  }
}

async function initializeDatabase(...files: string[]) {
  for (const file of files) {
    await executeSQLFile(file);
  }
}

initializeDatabase("tb_users_tbu.sql", "tb_courses_tbc.sql", "rel_courses_users.sql");
