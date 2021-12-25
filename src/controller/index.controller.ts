'use strict';

import { NextFunction, Request, Response } from 'express';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ title: 'Curriculum API' });
};
