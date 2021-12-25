import { NextFunction, Request, Response } from 'express';
import { ReadDocumentResponse } from '../libs/response';

/*
 * One
 */

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(new ReadDocumentResponse(req.user.publicData()));
  } catch (err: any) {
    next(err);
  }
};

/*
 * Others
 */

export const filterProfilesOfOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    req.query.filters.owner = id;
    next();
  } catch (err: any) {
    next(err);
  }
};
