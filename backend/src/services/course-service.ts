import { createCourse, getAllCourses } from "../repositories/course-repository";
import { CreateCourseDto } from "../types/create-course-dto";

async function createCourseService(course: CreateCourseDto) {
  return await createCourse(course);
}

async function getAllCoursesService() {
  return await getAllCourses();
}


export {
  createCourseService,
  getAllCoursesService
}