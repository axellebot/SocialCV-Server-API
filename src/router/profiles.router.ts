'use strict';

import { Router } from 'express';
import { partsCtrl, profilesCtrl } from '../controller';
import { Parameters, Paths } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const profilesRouter = Router();

profilesRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.profiles:read'],
  }),
  parseQuerySelection,
  profilesCtrl.findManyAsPublic
);

profilesRouter.get(
  '/' + ':' + Parameters.PARAM_ID_PROFILE,
  requireAuthentication({
    scopes: ['public.profiles:read'],
  }),
  profilesCtrl.findOneAsPublic
);

profilesRouter.get(
  '/' + ':' + Parameters.PARAM_ID_PROFILE + Paths.parts,
  requireAuthentication({
    scopes: ['public.profiles:read', 'public.parts:read'],
  }),
  parseQuerySelection,
  profilesCtrl.filterPartsOfOne,
  partsCtrl.findManyAsPublic
);

export { profilesRouter };
