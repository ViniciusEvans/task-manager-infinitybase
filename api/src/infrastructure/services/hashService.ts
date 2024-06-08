import { compare, hash } from "bcrypt-ts";
import { HashAlgorithms, IHashService } from "src/domain/services/IHashService";
import crypto from "crypto";

export class HashService implements IHashService {
  constructor() {}
  async encrypt(password: string): Promise<string> {
    return await hash(password, 10);
  }
  async compare(
    toComparePassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return await compare(toComparePassword, hashPassword);
  }

  hashBinary(binary: Buffer, algorithm?: HashAlgorithms) {
    return crypto
      .createHash(algorithm ?? "sha256")
      .update(binary)
      .digest("hex");
  }
}
