import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1,{ message: "Insira um Título"}),
  description: z.string().min(1,{ message: "Insira uma descrição"}),
  hours: z.number().nonnegative().min(1, "Insira uma carga horária válida para o curso"),
});