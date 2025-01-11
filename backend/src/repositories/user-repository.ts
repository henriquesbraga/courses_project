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

async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql<User[]>`
    SELECT
      id_user_tbu,
      name_user_tbu,
      email_user_tbu,
      password_user_tbu,
      is_active_user_tbu,
      created_at_user_tbu
    FROM 
      public.tb_users_tbu
    WHERE id_user_tbu = ${id}`;

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    throw new Error("User not found");
  }
}

async function updateUser(user: User): Promise<User | null> {
  try {
    const result = await sql<User[]>`
    UPDATE public.tb_users_tbu
    SET
      name_user_tbu = ${user.name_user_tbu},
      email_user_tbu = ${user.email_user_tbu},
      password_user_tbu = ${user.password_user_tbu}
    WHERE id_user_tbu = ${user.id_user_tbu}
    RETURNING *`;

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.log("Error while updating user: ", error);
    throw new Error("Error while updating user");
  }
}

async function deleteUser(id: number): Promise<boolean> {
  try {
    const result = await sql<User[]>`
    UPDATE
      public.tb_users_tbu
    SET
      is_active_user_tbu = FALSE
    WHERE 
      id_user_tbu = ${id}
    RETURNING *`;

    if (result.length === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error while deleting user: ", error);
    throw new Error("Error while deleting user");
  }
}

export { createUser, getUserById, updateUser, deleteUser };
