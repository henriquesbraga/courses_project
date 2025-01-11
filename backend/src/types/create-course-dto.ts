import { Course } from "./course";

export type CreateCourseDto = Omit<Course, "id" | "created_at">;