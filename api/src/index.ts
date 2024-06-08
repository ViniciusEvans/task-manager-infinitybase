import "express-async-errors";
import express from "express";
import { configureDI } from "./web/services";
import "dotenv/config";
import errorHandler from "./web/middlewares/errorHandler";
import { AppDataSource } from "./data-source";
import { configureRouter } from "./routes";
import cors from "cors";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const diContainer = configureDI();
  configureRouter(app, diContainer);

  app.use(errorHandler);

  app.listen(process.env.PORT || 8000);
});
