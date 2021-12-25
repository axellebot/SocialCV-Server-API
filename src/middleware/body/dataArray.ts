import { NextFunction, Request, Response } from 'express';
import { requireData } from '.';
import { BodyWrongDataError } from '../../libs/error';

export const requireDataArray = [
  requireData,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!Array.isArray(req.body.data)) throw new BodyWrongDataError();
      next();
    } catch (err: any) {
      next(err);
    }
  },
];
