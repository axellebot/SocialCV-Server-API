import { NextFunction, Request, Response } from 'express';
import { BodyMissingDataError } from '../../libs/error';
// Errors

export async function requireData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body.data) throw new BodyMissingDataError();
    next();
  } catch (err: any) {
    next(err);
  }
}
