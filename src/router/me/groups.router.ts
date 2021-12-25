import { Router } from 'express';
import { groupsCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const meGroupsRouter = Router();

meGroupsRouter.post(
  '/',
  requireAuthentication({
    scopes: ['owner.groups:write'],
  }),
  requireDataObject,
  groupsCtrl.createOneAsOwner
);

meGroupsRouter.put(
  '/',
  requireAuthentication({
    scopes: ['owner.groups:write'],
  }),
  requireDataArray,
  groupsCtrl.updateManyAsOwner
);

meGroupsRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['owner.groups:delete'],
  }),
  groupsCtrl.deleteAllAsOwner
);

meGroupsRouter.put(
  '/' + ':' + Parameters.PARAM_ID_GROUP,
  requireAuthentication({
    scopes: ['owner.groups:write'],
  }),
  requireDataObject,
  groupsCtrl.updateOneAsOwner
);

meGroupsRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_GROUP,
  requireAuthentication({
    scopes: ['owner.groups:delete'],
  }),
  groupsCtrl.deleteOneAsOwner
);

export { meGroupsRouter };
