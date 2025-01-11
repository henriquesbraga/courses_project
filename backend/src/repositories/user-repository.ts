import sql from "../database/connection";
import { CreateUserDto } from "../types/create-user-dto";
import { User } from "../types/user";
import { getFormattedDate } from "../utils/date-utils";

async function createUser(user: CreateUserDto): Promise<User> {
  try {
    const result = await sql<User[]>`
    INSERT INTO public.tb_users_tbu (
      name_user_tbu,
      email_user_tbu,
      password_user_tbu,
      created_at
    ) VALUES (
     ${user.name_user_tbu},
     ${user.email_user_tbu},
     ${user.password_user_tbu},
     ${getFormattedDate()}
    ) RETURNING *`;

    return result[0];
  } catch (error: any) {
    console.log("Error while creating user: ", error.message);
    throw new Error(error.message);
  }
}

async function getUserByEmail(email: string): Promise<User | null> {

  try {
    const result = await sql<User[]>`
    SELECT
      id_user_tbu ,
      name_user_tbu,
      email_user_tbu,
      password_user_tbu,
      is_active_user_tbu,
      created_at
    FROM 
      public.tb_users_tbu
    WHERE email_user_tbu ilike ${email}`;

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    throw new Error("User not found");
  }
}

async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql<User[]>`
    SELECT
      id_user_tbu,
      name_user_tbu,
      email_user_tbu,
      password_user_tbu,
      is_active_user_tbu,
      created_at
    FROM 
      public.tb_users_tbu
    WHERE id_user_tbu = ${id}`;

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    throw new Error("Erro ao buscar dados do usuário");
  }
}



export { createUser, getUserById, getUserByEmail };
