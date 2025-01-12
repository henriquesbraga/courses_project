import { api } from "../config/api";

export async function login(data: LoginRequest): Promise<LoginApiResponse> {
  return new Promise(async (resolve, reject) => {
    const { email, password } = data;

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.status != 200) {
        reject(response.data.message);
        return;
      }
      const { data } = response;
      console.log("data", data);
      resolve(data);
    } catch (err: any) {
      reject(err.response.data.message);
    }
  });
}

export async function register(
  data: RegisterRequest
): Promise<LoginApiResponse> {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = data;

    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      if (response.status != 200) {
        reject(response.data.message);
        return;
      }
      const { data } = response;
      console.log("data", data);
      resolve(data);
    } catch (err: any) {
      reject(err.response.data.message);
    }
  });
}
