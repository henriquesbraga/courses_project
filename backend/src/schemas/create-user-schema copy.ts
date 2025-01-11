import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1,{ message: "Insira um nome"}),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});