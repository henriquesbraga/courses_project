import { Request, Response } from "express";
import {
  createCourseService,
  getAllCoursesService,
  enrollUserToCourseService,
  getAllCoursesByUserIdService,
} from "../services/course-service";
import { EnrollUserToCourse } from "../types/enroll-user-to-course";

async function createCourseEndpoint(req: Request, res: Response) {
  const course = req.body;
  try {
    const result = await createCourseService(course);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllCoursesEndpoint(req: Request, res: Response) {
  
  try {
    const result = await getAllCoursesService();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function enrollUserToCourseEndpoint(req: Request, res: Response) {
  const { courseId, userId } = req.body;

  const enroll: EnrollUserToCourse = { courseId, userId };
  try {
    await enrollUserToCourseService(enroll);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error: any) {
    if (error.message.includes("duplicate key value")) {
      res
        .status(400)
        .json({ message: "Usuário já está cadastrado no curso desejado!" });
      return;
    }
    res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário no curso desejado." });
  }
}

async function getAllCoursesByUserIdEndpoint(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new Error("Usuário nao informado");
    }

    const data = await getAllCoursesByUserIdService(parseInt(userId));
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário no curso desejado." });
  }
}

export {
  createCourseEndpoint,
  getAllCoursesEndpoint,
  enrollUserToCourseEndpoint,
  getAllCoursesByUserIdEndpoint,
};
