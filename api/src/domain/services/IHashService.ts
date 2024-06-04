export interface IHashService {
  encrypt(password: string): Promise<string>;
  compare(toComparePassword: string, validPassword: string): Promise<boolean>;
}
