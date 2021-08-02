import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

import swaggerConfig from "../../swagger.json";
import createConnnection from "./typeorm";

import "@shared/container";

createConnnection();
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

export { app };
