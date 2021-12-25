import { NextFunction, Request, Response } from 'express';
import { QueryWrongCursorPaginationError } from '../../libs/error';
import { logger } from '../../libs/logger';

/**
 * @param req
 * @param res
 * @param next
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Pagination
    const offset = req.query.offset;
    const limit = req.query.limit;

    if (!offset && !limit) throw new QueryWrongCursorPaginationError();

    if (!(typeof offset === 'number' && typeof limit === 'number'))
      throw new QueryWrongCursorPaginationError(
        'Pagination cursor must be a number.'
      );
    if (offset < 0 || limit < 0)
      throw new QueryWrongCursorPaginationError(
        'Pagination cursor must be >=0'
      );

    logger.info(
      'Pagination : {',
      `offset: ${offset} ,`,
      `limit: ${limit} `,
      '}'
    );
  } catch (err: any) {
    next(err);
  }
};
