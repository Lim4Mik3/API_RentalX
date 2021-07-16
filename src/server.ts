import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerConfig from "./swagger.json";

import "./shared/container";
import "./database";

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        Error: err.message,
      });
    }

    return response.status(500).json({
      Error: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log("Server is running!");
});
