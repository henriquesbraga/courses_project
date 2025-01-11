import bcrypt from "bcrypt";
import { createUser } from "../repositories/user-repository";
import { CreateUserDto } from "../types/create-user-dto";
import { omit } from "../utils/omit";

const { SALT_ROUNDS } = process.env;


async function create(user: CreateUserDto) {
  try {
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password_user_tbu, salt);
    user.password_user_tbu = hash;
    const createdUser = await createUser(user);
    const userWithoutPassword = omit(createdUser, ["password_user_tbu"]);
    return userWithoutPassword;
  } catch (err: any) {

    throw err;
  }
}

export { create };
