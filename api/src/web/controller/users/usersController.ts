import { Request, Response } from "express";
import { UserService } from "../../../application/services/usersService";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";

export class UsersController {
  constructor(private readonly userService: UserService) {}

  async signup(req: Request, res: Response) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new InvalidArgument("Arguments are missing", 400);
    }

    await this.userService.createUser(name, email, password);

    return res.sendStatus(204);
  }
}
