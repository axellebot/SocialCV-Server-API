import { Router } from 'express';
import { identityCtrl, profilesCtrl } from '../controller';
import { Paths } from '../libs/constant';
import { requireAuthentication } from '../middleware/security/authentication';
import { parseQuerySelection } from '../middleware/selection';

const accountRouter = Router();

accountRouter.get(
  '/',
  requireAuthentication({ scopes: ['opendid'] }),
  identityCtrl.findOne
);

accountRouter.get(
  Paths.profiles,
  requireAuthentication({ scopes: ['public.profiles:read'] }),
  parseQuerySelection,
  identityCtrl.filterProfilesOfOne,
  profilesCtrl.findManyAsPublic
);

export { accountRouter };
