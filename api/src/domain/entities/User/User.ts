import { v4 as uuid } from "uuid";
export class User {
  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.password = password;
    this.email = email;
  }
  id!: string;
  name!: string;
  password!: string;
  email!: string;
}
