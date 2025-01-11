import { User } from "./user";

export type CreateUserDto = Omit<User, 'id_user_tbu' | 'createdAt' | 'created_at'>;