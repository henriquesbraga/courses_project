import sql from "../database/connection";
import { Course } from "../types/course";
import { CreateCourseDto } from "../types/create-course-dto";
import { EnrollUserToCourse } from "../types/enroll-user-to-course";
import { getFormattedDate } from "../utils/date-utils";

async function createCourse(course: CreateCourseDto): Promise<Course> {
  try {
    const result = await sql<Course[]>`
    INSERT INTO public.tb_courses_tbc (
      title_course_tbc,
      description_course_tbc,
      workload_course_tbc,
      created_at
    ) VALUES (
      ${course.title},
      ${course.description},
      ${course.workload},
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
      id_course_tbc,
      title_course_tbc,
      description_course_tbc,
      workload_course_tbc,
      created_at
    FROM 
      public.tb_courses_tbc`;
    return result;
  } catch (error: any) {
    console.log("Erro ao buscar cursos: ", error.message);
    throw new Error(error.message);
  }
}

async function getCoursesByUserId(userId: number): Promise<Course[]> {
  try {
    const result = await sql<Course[]>`
    SELECT 
      c.id_course_tbc,
      c.title_course_tbc,
      c.description_course_tbc,
      c.workload_course_tbc,
      c.created_at AS course_created_at,
      r.registered_at AS user_registered_at
    FROM 
      rel_courses_users r
    INNER JOIN
      tb_courses_tbc c ON r.id_course_tbc = c.id_course_tbc
    WHERE 
      r.id_user_tbu = ${userId};`;
    return result;
  } catch (error: any) {
    console.log("Erro ao buscar curso: ", error.message);
    throw new Error(error.message);
  }
}

async function registerUserInCourse(enroll: EnrollUserToCourse) {
  try {
    await sql`
    INSERT INTO public.rel_courses_users (
      id_course_tbc,
      id_user_tbu,
      registered_at
    ) VALUES (
      ${enroll.courseId},
      ${enroll.userId},
      ${getFormattedDate()}
    )ON CONFLICT (id_course_tbc, id_user_tbu) DO NOTHING;`;

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
