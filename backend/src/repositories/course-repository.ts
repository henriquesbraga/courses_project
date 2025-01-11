import sql from "../database/connection";
import { Course } from "../types/course";
import { CreateCourseDto } from "../types/create-course-dto";
import { EnrollUserToCourse } from "../types/enroll-user-to-course";
import { formatDate, getFormattedDate } from "../utils/date-utils";

async function createCourse(course: CreateCourseDto): Promise<Course> {
  try {
    const result = await sql<Course[]>`
    INSERT INTO public.courses (
      title,
      description,
      hours,
      created_at
    ) VALUES (
      ${course.title},
      ${course.description},
      ${course.hours},
      ${getFormattedDate()}
    ) RETURNING *`;

    return result[0];
  } catch (error: any) {
    console.log("Erro ao cadastrar curso: ", error.message);
    throw new Error(error.message);
  }
}

async function getAllCourses(): Promise<Course[]> {
  try {
    const result = await sql<Course[]>`
    SELECT
      id,
      title,
      description,
      hours,
      created_at
    FROM 
      public.courses`;
    return result.map((e) => ({ ...e, created_at: formatDate(e.created_at) }));
  } catch (error: any) {
    console.log("Erro ao buscar cursos: ", error.message);
    throw new Error(error.message);
  }
}

async function getCoursesByUserId(userId: number): Promise<Course[]> {
  try {
    const result = await sql<Course[]>`
    SELECT 
      c.id,
      c.title,
      c.description,
      c.hours,
      c.created_at,
      e.enrolled_at
    FROM 
      enrollments e
    INNER JOIN
      courses c ON e.id = c.id
    WHERE 
      e.id = ${userId};`;
    return result.map((e) => ({
      ...e,
      created_at: formatDate(e.created_at),
      enrolled_at: formatDate(e.enrolled_at!),
    }));
  } catch (error: any) {
    console.log("Erro ao buscar curso: ", error.message);
    throw new Error(error.message);
  }
}

async function registerUserInCourse(enroll: EnrollUserToCourse) {
  try {
    await sql`
    INSERT INTO public.enrollments (
      user_id,
      course_id,
      enrolled_at
    ) VALUES (
      ${enroll.userId},
      ${enroll.courseId},
      ${getFormattedDate()}
    ) ON CONFLICT (user_id, course_id) DO NOTHING;`;
    return true;
  } catch (error: any) {
    console.log("Erro ao cadastrar curso: ", error.message);
    throw new Error(error.message);
  }
}

export {
  createCourse,
  getAllCourses,
  getCoursesByUserId,
  registerUserInCourse,
};
