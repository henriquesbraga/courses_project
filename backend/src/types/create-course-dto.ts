import { Course } from "./course";

export type CreateCourseDto = Omit<Course, "idCourse" | "createdAt">;