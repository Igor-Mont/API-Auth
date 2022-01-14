import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";

interface TokenPayload {
  id: string;
}

function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if(!authorization) throw new AppError("Token missing!", 401);

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = verify(token, "8cc5801266985f9ce44e736aee15f04d");
    const { id } = data as TokenPayload;

    request.userId = id;

    return next();

  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}

export { ensureAuthenticate };