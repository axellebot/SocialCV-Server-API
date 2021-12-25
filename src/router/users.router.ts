'use strict';

import { Router } from 'express';
import { usersCtrl } from '../controller';
import { Parameters } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const usersRouter = Router();

usersRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.users:read'],
  }),
  parseQuerySelection,
  usersCtrl.findManyAsPublic
);

usersRouter.get(
  '/' + ':' + Parameters.PARAM_ID_USER,
  requireAuthentication({
    scopes: ['public.users:read'],
  }),
  usersCtrl.findOneAsPublic
);

export { usersRouter };
