export type HashAlgorithms = "sha256";
export interface IHashService {
  encrypt(password: string): Promise<string>;
  compare(toComparePassword: string, hashPassword: string): Promise<boolean>;
  hashBinary(binary: Buffer, algorithm?: HashAlgorithms): string;
}
