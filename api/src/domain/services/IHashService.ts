export interface IHashService {
  encrypt(password: string): Promise<string>;
  compare(toComparePassword: string, hashPassword: string): Promise<boolean>;
}
