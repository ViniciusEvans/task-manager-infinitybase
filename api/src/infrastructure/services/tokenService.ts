import jwt, { JwtPayload } from "jsonwebtoken";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";
import { ITokenService, TokenContent } from "src/domain/services/ITokenService";

export class TokenService implements ITokenService {
  constructor() {}
  tokenValidate(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error: any) {
      const manageableErrorMessages = ["invalid signature", "jwt expired"];

      if (manageableErrorMessages.includes(error.message)) {
        throw new InvalidArgument(error.message as string, 400);
      }
      throw new Error(error);
    }
  }

  createTokens({ id, email, name }: TokenContent): {
    accessToken: string;
    refreshToken: string;
  } {
    const tokens = {
      accessToken: this.createAccessToken({ id, email, name }),
      refreshToken: this.createRefreshtoken({ id, email, name }),
    };

    return tokens;
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }

  private createRefreshtoken(data: {
    name: string;
    email: string;
    id: string;
  }) {
    return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
  }

  private createAccessToken(data: { name: string; email: string; id: string }) {

    return jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }
}
