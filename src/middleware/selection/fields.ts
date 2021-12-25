'use strict';

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
    logger.info('Fields : ', req.query.fields);

    req.query.fields = req.query.fields || ''; // fields selected or all fields
    const fieldsString = req.query.fields;

    if (typeof fieldsString !== 'string') throw new ApiError();

    req.query.fields = fieldsString.replace(',', ' ');

    next();
  } catch (err: any) {
    next(err);
  }
};
