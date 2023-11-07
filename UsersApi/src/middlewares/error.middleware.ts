import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
};
