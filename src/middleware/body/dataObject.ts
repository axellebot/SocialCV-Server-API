import { NextFunction, Request, Response } from 'express';
import { requireData } from '.';
import { BodyWrongDataError } from '../../libs/error';

export const requireDataObject = [
  requireData,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body.data !== 'object') throw new BodyWrongDataError();
      next();
    } catch (err: any) {
      next(err);
    }
  },
];
