import { Router } from 'express';
import { rolesCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const adminRolesRouter: Router = Router();

adminRolesRouter.put(
  '/' + ':' + Parameters.PARAM_ID_ROLE,
  requireAuthentication({
    scopes: ['admin.roles:write'],
  }),
  requireDataObject,
  rolesCtrl.updateOneAsAdmin
);

adminRolesRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_ROLE,
  requireAuthentication({
    scopes: ['admin.roles:delete'],
  }),
  rolesCtrl.deleteOneAsAdmin
);

adminRolesRouter.post(
  '/',
  requireAuthentication({
    scopes: ['admin.roles:write'],
  }),
  requireDataObject,
  rolesCtrl.createOneAsAdmin
);

adminRolesRouter.put(
  '/',
  requireAuthentication({
    scopes: ['admin.roles:write'],
  }),
  requireDataArray,
  rolesCtrl.updateManyAsAdmin
);

adminRolesRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['admin.roles:delete'],
  }),
  rolesCtrl.deleteAllAsAdmin
);

export { adminRolesRouter };
