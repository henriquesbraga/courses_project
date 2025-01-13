import { Request, Response } from "express";
import {
  createUserService,
  findByIdService,
  getAllUsersWithHisCoursesService,
  loginUserService,
  refreshUserTokenService,
} from "../services/user-service";
import { CreateUserDto } from "../types/create-user-dto";

async function registerEndpoint(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user: CreateUserDto = {
      name: name,
      email: email,
      password: password,
    };

    const newUser = await createUserService(user);
    res.status(201).json(newUser);
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      res
        .status(409)
        .json({ message: "Usuário já cadastrado com este email!" });
      return;
    }
    res.status(500).json({ message: error.message });
  }
}

async function loginEndpoint(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const response = await loginUserService(email, password);
    res.status(200).json(response);
  } catch (error: any) {

    if(error.message.includes("Senha inválida")) {
      res.status(401).json({ message: error.message });
      return
    }

    res.status(500).json({ message: error.message });
  }
}

async function refreshTokenEndpoint(req: Request, res: Response) {
  const { authorization } = req.headers;

  try {
    const bearerToken = authorization?.split(" ")[1];

    if (!bearerToken) {
      throw new Error("Token não informado");
    }

    const token = await refreshUserTokenService(bearerToken);

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserInfoEndpoint(req: Request, res: Response) {
  const { id } = req.params;
  const { authorization } = req.headers;

  try {
    if (!id) {
      throw new Error("Id não informado");
    }

    if (!authorization) {
      throw new Error("Token não informado");
    }

    const response = await findByIdService(
      parseInt(id),
      authorization.split(" ")[1]
    );

    if (!response) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllUsersWithHisCoursesEndpoint(req: Request, res: Response) {
  
  try {
    const data = await getAllUsersWithHisCoursesService();
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao carregar dados. Tente novamente mais tarde." });
  }
}

export {
  registerEndpoint,
  loginEndpoint,
  refreshTokenEndpoint,
  getUserInfoEndpoint,
  getAllUsersWithHisCoursesEndpoint
};
