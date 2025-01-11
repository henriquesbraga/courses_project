import { z } from "zod";

export const enrollUserToCourseSchema = z.object({
  courseId: z.number().min(1,{ message: "Insira um curso"}),
  userId: z.number().min(1,{ message: "Insira um usuário"}),
});