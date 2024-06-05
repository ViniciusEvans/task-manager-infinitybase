import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./domain/entities/User/User";
import { Board } from "./domain/entities/Board/Board";
import { Task } from "./domain/entities/Task/Task";
import { UserRole } from "./domain/entities/Board/UserRole";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Board, Task, UserRole],
  migrations: [`src/infrastructure/database/migrations/*.{ts,js}`],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
});
