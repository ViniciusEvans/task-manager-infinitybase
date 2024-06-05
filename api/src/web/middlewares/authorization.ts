import { NextFunction, Request, Response } from "express";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";
import { TokenService } from "src/infrastructure/services/tokenService";

export const authorization = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const publicRoutes: string[] = ["/signup", "/login", "/refresh"];

    if (publicRoutes.includes(req.path)) {
      next();
      return;
    }

    const header = req.headers.authorization;

    if (!header) {
      throw new InvalidArgument("Unauthorized", 401);
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new InvalidArgument("Unauthorized", 401);
    }

    const tokenService = new TokenService();

    tokenService.tokenValidate(token);

    const decode = tokenService.decode(token);

    if (!decode) {
      throw new InvalidArgument("Unauthorized", 401);
    }

    //@ts-ignore next-line
    req["currentUser"] = decode;

    next();
  } catch (error) {
    next(error);
  }
};
