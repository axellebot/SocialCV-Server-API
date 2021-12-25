import { Router } from 'express';
import { usersCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const adminUsersRouter: Router = Router();

adminUsersRouter.post(
  '/',
  requireAuthentication({
    scopes: ['admin.users:write'],
  }),
  requireDataObject,
  usersCtrl.createOneAsAdmin
);

adminUsersRouter.put(
  '/',
  requireAuthentication({
    scopes: ['admin.users:write'],
  }),
  requireDataArray,
  usersCtrl.updateManyAsAdmin
);

adminUsersRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['admin.users:delete'],
  }),
  usersCtrl.deleteAllAsAdmin
);

adminUsersRouter.put(
  '/' + ':' + Parameters.PARAM_ID_USER,
  requireAuthentication({
    scopes: ['admin.users:write'],
  }),
  requireDataObject,
  usersCtrl.updateOneAsAdmin
);

adminUsersRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_USER,
  requireAuthentication({
    scopes: ['admin.users:delete'],
  }),
  usersCtrl.deleteOneAsAdmin
);

export { adminUsersRouter };
