import { InvalidArgument } from "src/domain/entities/commom/ApplicationLayerException";
import { AuthenticationService } from "../../../application/services/authenticationService";
import { NextFunction, Request, Response } from "express";

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new InvalidArgument("email and password must be provided!", 400);
      }
      const tokens = await this.authenticationService.authenticate(
        email,
        password
      );

      return res.status(200).send(tokens);
    } catch (error) {
      next(error);
    }
  }

  async refreshAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new InvalidArgument("refreshToken must be provided", 400);
      }

      const tokens = await this.authenticationService.refreshToken(
        refreshToken
      );

      return res.status(200).send(tokens);
    } catch (error) {
      next(error);
    }
  }
}
