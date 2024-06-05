import { NextFunction, Request, Response } from "express";
import { InvalidArgument } from "src/domain/commom/ApplicationLayerException";

export default function errorHandler(
  err: InvalidArgument,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail";
    return res.status(err.statusCode).json({ errorMessage: err.message });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}
