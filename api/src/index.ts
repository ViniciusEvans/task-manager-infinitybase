import express from "express";
import { configureDI, configureRouter } from "./web/services";
import "dotenv/config";
import errorHandler from "./web/middlewares/errorHandler";

const app = express();

app.use(express.json());

const diContainer = configureDI();
configureRouter(app, diContainer);

app.use(errorHandler);

app.listen(process.env.PORT || 3000);
