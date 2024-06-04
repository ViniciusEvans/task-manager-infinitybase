import { IUserRepository } from "src/domain/entities/User/IUserRepository";
import { InvalidArgument } from "src/domain/entities/commom/ApplicationLayerException";
import { IHashService } from "src/domain/services/IHashService";
import { ITokenService } from "src/domain/services/ITokenService";

export class AuthenticationService {
  constructor(
    private readonly UserRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService
  ) {}

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this.tokenService.tokenValidate(refreshToken);

    const { email, name, id } = this.tokenService.decode(refreshToken);

    return this.tokenService.createTokens({ email, name, id });
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.UserRepository.getUserByEmail(email);

    if (!user) {
      throw new InvalidArgument("email or password could be wrong!", 400);
    }

    if (!(await this.hashService.compare(password, user.password))) {
      throw new InvalidArgument("email or password could be wrong!", 400);
    }

    const token = this.tokenService.createTokens({ ...user });

    return token;
  }
}
