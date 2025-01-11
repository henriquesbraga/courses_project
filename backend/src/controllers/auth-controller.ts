import { Request, Response } from "express";
import { create, loginUser } from "../services/user-service";
import { CreateUserDto } from "../types/create-user-dto";

async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user: CreateUserDto = {
      name_user_tbu: name,
      email_user_tbu: email,
      password_user_tbu: password,
    };
    
    const newUser = await create(user);
    res.status(201).json(newUser);
  } catch (error: any) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      res.status(409).json({ error: "Usuário já cadastrado com este email!" });
      return;
    }
    res.status(500).json({ error: error.message });
  }
}

async function login(req: Request, res: Response) {

  const { email, password } = req.body;
  try {
    const response = await loginUser(email, password);
    res.status(200).json(response);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { register, login };
