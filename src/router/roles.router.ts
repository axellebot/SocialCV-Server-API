'use strict';

import { Router } from 'express';
import { rolesCtrl } from '../controller';
import { Parameters } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const rolesRouter = Router();

rolesRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.roles:read'],
  }),
  parseQuerySelection,
  rolesCtrl.findMany
);

rolesRouter.get(
  '/' + ':' + Parameters.PARAM_ID_ROLE,
  requireAuthentication({
    scopes: ['public.roles:read'],
  }),
  rolesCtrl.findOne
);

export { rolesRouter };
