import { Router } from 'express';
import { entriesCtrl } from '../controller';
import { Parameters } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const entriesRouter = Router();

entriesRouter.get(
  '/',
  requireAuthentication({
    scopes: ['public.entries:read'],
  }),
  parseQuerySelection,
  entriesCtrl.findManyAsPublic
);

entriesRouter.get(
  '/' + ':' + Parameters.PARAM_ID_ENTRY,
  requireAuthentication({
    scopes: ['public.entries:read'],
  }),
  entriesCtrl.findOneAsPublic
);

export { entriesRouter };
