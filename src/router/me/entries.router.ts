import { Router } from 'express';
import { entriesCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const meEntriesRouter: Router = Router();

meEntriesRouter.post(
  '/',
  requireAuthentication({
    scopes: ['owner.entries:write'],
  }),
  requireDataObject,
  entriesCtrl.createOneAsOwner
);

meEntriesRouter.put(
  '/',
  requireAuthentication({
    scopes: ['owner.entries:write'],
  }),
  requireDataArray,
  entriesCtrl.updateManyAsOwner
);

meEntriesRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['owner.entries:delete'],
  }),
  entriesCtrl.deleteAllAsOwner
);

meEntriesRouter.put(
  '/' + ':' + Parameters.PARAM_ID_ENTRY,
  requireAuthentication({
    scopes: ['owner.entries:write'],
  }),
  requireDataObject,
  entriesCtrl.updateOneAsOwner
);

meEntriesRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_ENTRY,
  requireAuthentication({
    scopes: ['owner.entries:delete'],
  }),
  entriesCtrl.deleteOneAsOwner
);

export { meEntriesRouter };
