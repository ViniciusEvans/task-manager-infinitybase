import { IUserRepository } from "src/domain/entities/User/IUserRepository";
import { User } from "src/domain/entities/User/User";
import { InvalidArgument } from "src/domain/entities/commom/ApplicationLayerException";
import { IHashService } from "src/domain/services/IHashService";

export class UserService {
  constructor(
    private readonly UserRepository: IUserRepository,
    private readonly hashService: IHashService
  ) {}

  async CreateUser(name: string, email: string, password: string) {
    const isEmailInUse = (await this.UserRepository.getUserByEmail(email))
      ? true
      : false;

    if (isEmailInUse) {
      throw new InvalidArgument("Email already in use!", 400);
    }

    const hashPassword = await this.hashService.encrypt(password);

    await this.UserRepository.store(new User(name, hashPassword, email));

    return true;
  }
}
