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

async function createUserService(user: CreateUserDto) {
  try {
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const createdUser = await createUser(user);
    const userWithoutPassword = omit(createdUser, ["password"]);
    return userWithoutPassword;
  } catch (err: any) {
    console.log(err)
    throw err;
  }
}

async function findByEmailService(email: string) {
  return await getUserByEmail(email);
}

async function findByIdService(id: number, bearerToken: string) {
  // User can only fetch his own data
  const tokenData: CustomJwtPayload = JwtService.verifyToken(bearerToken);

  if (tokenData.userId !== id) {
    throw new Error("Usuário não autorizado");
  }

  const data = await getUserById(id);
  var entity =  {
    ...data,
    created_at: formatDate(data?.created_at!)
  }
  
  
  
  if (data) {
    return entity
  }
}

async function loginUserService(email: string, password: string) {
  try {
    const user = await findByEmailService(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = JwtService.generateToken({
      userId: user.id,
      email: user.email,
    });

    const userWithoutPassword = omit(user, ["password"]);

    return {
      ...userWithoutPassword,
      created_at: formatDate(user.created_at),
      token,
    };
  } catch (error: any) {
    throw error;
  }
}

async function refreshUserTokenService(bearerToken: string) {
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

export {
  createUserService,
  loginUserService,
  refreshUserTokenService,
  findByIdService,
};
