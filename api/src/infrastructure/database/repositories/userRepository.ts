import { IUserRepository } from "src/domain/entities/User/IUserRepository";
import { User } from "src/domain/entities/User/User";
import { DataSource } from "typeorm";

export class UserRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async store(user: User): Promise<void> {
    await this.dataSource.getRepository(User).save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ email });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ id });
  }
}
