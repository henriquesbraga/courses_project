import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../repositories/user-repository";
import { CreateUserDto } from "../types/create-user-dto";
import { omit } from "../utils/omit";
import { CustomJwtPayload, JwtService } from "./jwt-service";
import { formatDate } from "../utils/date-utils";

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

async function findByEmail(email: string) {
  return await getUserByEmail(email);
}

async function findById(id: number, bearerToken: string) {
  // User can only fetch his own data
  const tokenData: CustomJwtPayload = JwtService.verifyToken(bearerToken);

  if (tokenData.userId !== id) {
    throw new Error("Usuário não autorizado");
  }

  const data = await getUserById(id);

  if (data) {
    return omit(data, ["password_user_tbu"]);
  }
}

async function loginUser(email: string, password: string) {
  try {
    const user = await findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_user_tbu
    );

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = JwtService.generateToken({
      userId: user.id_user_tbu,
      email: user.email_user_tbu,
    });

    const userWithoutPassword = omit(user, ["password_user_tbu"]);

    return {
      ...userWithoutPassword,
      created_at: formatDate(user.created_at),
      token,
    };
  } catch (error: any) {
    throw error;
  }
}

async function refreshUserToken(bearerToken: string) {
  try {
    const data: CustomJwtPayload = JwtService.verifyToken(bearerToken);

    if (!data) {
      throw new Error("Usuário não encontrado");
    }

    const token = JwtService.generateToken({
      userId: data.userId,
      email: data.email,
    });

    return token;
  } catch (error: any) {
    throw error;
  }
}




export { create, loginUser, refreshUserToken, findById };
