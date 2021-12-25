import { Router } from 'express';
import { entriesCtrl, groupsCtrl } from '../controller';
import { Parameters, Paths } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const groupsRouter = Router();

groupsRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.groups:read'],
  }),
  parseQuerySelection,
  groupsCtrl.findManyAsPublic
);

groupsRouter.get(
  '/' + ':' + Parameters.PARAM_ID_GROUP,
  requireAuthentication({
    scopes: ['public.groups:read'],
  }),
  groupsCtrl.findOneAsPublic
);

groupsRouter.get(
  '/' + ':' + Parameters.PARAM_ID_GROUP + Paths.entries,
  requireAuthentication({
    scopes: ['public.groups:read', 'public.entries:read'],
  }),
  parseQuerySelection,
  groupsCtrl.filterEntriesOfOne,
  entriesCtrl.findManyAsPublic
);

export { groupsRouter };
