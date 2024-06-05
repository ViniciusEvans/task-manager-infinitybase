import { User } from "./User";

export interface IUserRepository {
  store(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}
