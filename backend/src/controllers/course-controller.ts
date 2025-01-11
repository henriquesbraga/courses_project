import { Request, Response } from "express";
import { createCourseService, getAllCoursesService } from "../services/course-service";

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
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export {
  createCourseEndpoint,
  getAllCoursesEndpoint
}