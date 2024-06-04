import { JwtPayload } from "jsonwebtoken";

export interface ITokenService {
  createTokens({ id, email, name }: TokenContent): {
    accessToken: string;
    refreshToken: string;
  };
  tokenValidate(token: string): void;
  decode(token: string): JwtPayload;
}

export type TokenContent = {
  id: string;
  email: string;
  name: string;
};
