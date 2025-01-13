import {
  createCourse,
  getAllCourses,
  registerUserInCourse,
  getCoursesByUserId,
} from "../repositories/course-repository";
import { CreateCourseDto } from "../types/create-course-dto";
import { EnrollUserToCourse } from "../types/enroll-user-to-course";

async function createCourseService(course: CreateCourseDto) {
  return await createCourse(course);
}

async function getAllCoursesService() {
  return await getAllCourses();
}

async function enrollUserToCourseService(enroll: EnrollUserToCourse) {
  return await registerUserInCourse(enroll);
}

async function getAllCoursesByUserIdService(userId: number) {
  return await getCoursesByUserId(userId);
}



export {
  createCourseService,
  getAllCoursesService,
  enrollUserToCourseService,
  getAllCoursesByUserIdService
};
