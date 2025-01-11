import { User } from "./user";

export type CreateUserDto = Omit<User, 'id_user_tbu' | 'createdAt' | 'is_active_user_tbu'>;