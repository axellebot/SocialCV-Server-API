import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../libs/error';
import { logger } from '../../libs/logger';

/**
 * @param req
 * @param res
 * @param next
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Sort : ', req.query.sort);

    const sortString = req.query.sort || '';

    if (typeof sortString !== 'string') throw new ApiError();

    req.query.sort = sortString.replace(',', ' ');

    next();
  } catch (err: any) {
    next(err);
  }
};
