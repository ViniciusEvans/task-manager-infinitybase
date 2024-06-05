import { compare, hash } from "bcrypt-ts";
import { IHashService } from "src/domain/services/IHashService";

export class HashService implements IHashService {
  constructor() {}
  async encrypt(password: string): Promise<string> {
    return await hash(password, 10);
  }
  async compare(
    toComparePassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return await compare(toComparePassword, hashPassword)
  }
}
