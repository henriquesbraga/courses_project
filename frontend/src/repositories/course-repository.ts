import { api } from "../config/api";

export async function getUserCourses(
  access_token: string,
  userId: number
): Promise<CourseApiResponse[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`/enrollments/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status !== 200) {
        console.log("err res", response.status);
        reject(response.data.message);
        return;
      }

      resolve(response.data);
    } catch (err: any) {
      console.log("err", err);

      reject(err.response.data.message);
    }
  });
}

export async function getAllCourses(
  access_token: string
): Promise<CourseApiResponse[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(`/courses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status !== 200) {
        console.log("err res", response.status);
        reject(response.data.message);
        return;
      }

      resolve(response.data);
    } catch (err: any) {
      console.log("err", err);

      reject(err.response.data.message);
    }
  });
}

export async function createCourse(
  access_token: string,
  data: CourseApiResponse
): Promise<CourseApiResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post(`/courses`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status !== 201) {
        console.log("err res", response.status);
        reject(response.data.message);
        return;
      }

      resolve(response.data);
    } catch (err: any) {
      console.log("err", err);

      reject(err.response.data.message);
    }
  });
}

export async function enrollUserToACourse(
  access_token: string,
  data: { courseId: number; userId: number }
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post(`/enrollments`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status !== 201) {
        console.log("err res", response.status);
        reject(response.data.message);
        return;
      }

      resolve(response.data.message);
    } catch (err: any) {

      reject(err.response.data.message);
    }
  });
}
