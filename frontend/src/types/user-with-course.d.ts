type UserWithCourse = {
  id: number | null;
  name: string;
  email: string;
  created_at: string;
  courses: CourseApiResponse[]
}