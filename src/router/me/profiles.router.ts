import { Router } from 'express';
import { profilesCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const meProfilesRouter: Router = Router();

meProfilesRouter.post(
  '/',
  requireAuthentication({
    scopes: ['owner.profiles:write'],
  }),
  requireDataObject,
  profilesCtrl.createOneAsOwner
);

meProfilesRouter.put(
  '/',
  requireAuthentication({
    scopes: ['owner.profiles:write'],
  }),
  requireDataArray,
  profilesCtrl.updateManyAsOwner
);

meProfilesRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['owner.profiles:delete'],
  }),
  profilesCtrl.deleteAllAsOwner
);

meProfilesRouter.put(
  '/' + ':' + Parameters.PARAM_ID_PROFILE,
  requireAuthentication({
    scopes: ['owner.profiles:write'],
  }),
  requireDataObject,
  profilesCtrl.updateOneAsOwner
);

meProfilesRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_PROFILE,
  requireAuthentication({
    scopes: ['owner.profiles:delete'],
  }),
  profilesCtrl.deleteOneAsOwner
);

export { meProfilesRouter };
