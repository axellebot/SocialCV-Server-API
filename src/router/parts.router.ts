'use strict';

import { Router } from 'express';
import { groupsCtrl, partsCtrl } from '../controller';
import { Parameters, Paths } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const partsRouter = Router();
partsRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.parts:read'],
  }),
  parseQuerySelection,
  partsCtrl.findManyAsPublic
);

partsRouter.get(
  '/' + ':' + Parameters.PARAM_ID_PART,
  requireAuthentication({
    scopes: ['public.parts:read'],
  }),
  partsCtrl.findOneAsPublic
);

partsRouter.get(
  '/' + ':' + Parameters.PARAM_ID_PART + Paths.groups,
  requireAuthentication({
    scopes: ['public.parts:read', 'public.groups:read'],
  }),
  parseQuerySelection,
  partsCtrl.filterGroupsOfOne,
  groupsCtrl.findManyAsPublic
);

export { partsRouter };
