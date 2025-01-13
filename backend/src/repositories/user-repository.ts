import sql from "../database/connection";
import { Course } from "../types/course";
import { CreateUserDto } from "../types/create-user-dto";
import { User } from "../types/user";
import { formatDate, getFormattedDate } from "../utils/date-utils";

async function createUser(user: CreateUserDto): Promise<User> {
  try {
    const result = await sql<User[]>`
    INSERT INTO public.users (
      name,
      email,
      password,
      created_at
    ) VALUES (
     ${user.name},
     ${user.email},
     ${user.password},
     ${getFormattedDate()}
    ) RETURNING id, name, email, created_at`;

    return result.map((e) => ({
      ...e,
      created_at: formatDate(e.created_at),
    }))[0];
  } catch (error: any) {
    console.log("Erro ao criar usuário: ", error.message);
    throw new Error(error.message);
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql<User[]>`
    SELECT
      id,
      name,
      email,
      password,
      created_at
    FROM 
      public.users
    WHERE email ilike ${email}`;

    const data = result.map((e) => ({
      ...e,
      created_at: formatDate(e.created_at),
    }));

    return data[0] || null;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Erro ao carregar usuário");
  }
}

async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql<User[]>`
    SELECT
      id,
      name,
      email,
      created_at
    FROM 
      public.users
    WHERE id = ${id}`;

    if (result.length === 0) {
      return null;
    }

    return result.map((e) => ({
      ...e,
      created_at: formatDate(e.created_at),
    }))[0];
  } catch (error) {
    throw new Error("Erro ao buscar dados do usuário");
  }
}

async function getAllUsersWithHisCourses() {
  try {
    const result = await sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', c.id,
              'title', c.title,
              'description', c.description,
              'enrolled_at', e.enrolled_at
            )
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS courses
      FROM 
        users u
      LEFT JOIN 
        enrollments e ON u.id = e.user_id
      LEFT JOIN 
        courses c ON e.course_id = c.id
      GROUP BY 
        u.id, u.name, u.email
      ORDER BY 
        u.id;
    `;
    return result.map((user) => ({
      ...user,
      created_at: formatDate(user.created_at),
      courses: user.courses.map((course: Course) => ({
        ...course,
        enrolled_at: formatDate(course.enrolled_at!),
      })),
    }));
  } catch (error: any) {
    console.log("Erro ao carregar usuários: ", error.message);
    throw new Error(error.message);
  }
}

export { createUser, getUserById, getUserByEmail, getAllUsersWithHisCourses };
