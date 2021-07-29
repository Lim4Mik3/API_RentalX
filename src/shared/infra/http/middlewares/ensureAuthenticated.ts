import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const BearerToken = request.headers.authorization;

  if (!BearerToken) {
    throw new AppError("Token is not provided", 401);
  }

  const [, token] = BearerToken.split(" ");

  if (!token) {
    throw new AppError("Token is not provided", 401);
  }

  try {
    const { sub: user_id } = verify(
      token,
      "15b1c269e2207484d60e5f460eb76119"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Sign token invalid", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
}
