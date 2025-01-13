import { Course } from "./course";

export type UserWithCourse = {
  id: number;
  name: string;
  email: string;
  courses: Course[]
}