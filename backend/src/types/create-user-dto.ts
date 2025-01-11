import { User } from "./user";

export type CreateUserDto = Omit<User, 'id' | 'created_at'>;