import { Router } from 'express';
import { partsCtrl } from '../../controller';
import { Parameters } from '../../libs/constant';
import { requireDataArray, requireDataObject } from '../../middleware/body';
import { requireAuthentication } from '../../middleware/security/authentication';

const mePartsRouter = Router();

mePartsRouter.post(
  '/',
  requireAuthentication({
    scopes: ['owner.parts:write'],
  }),
  requireDataObject,
  partsCtrl.createOneAsOwner
);

mePartsRouter.put(
  '/',
  requireAuthentication({
    scopes: ['owner.parts:write'],
  }),
  requireDataArray,
  partsCtrl.updateManyAsOwner
);

mePartsRouter.delete(
  '/',
  requireAuthentication({
    scopes: ['owner.parts:delete'],
  }),
  partsCtrl.deleteAllAsOwner
);

mePartsRouter.put(
  '/' + ':' + Parameters.PARAM_ID_PART,
  requireAuthentication({
    scopes: ['owner.parts:write'],
  }),
  requireDataObject,
  partsCtrl.updateOneAsOwner
);

mePartsRouter.delete(
  '/' + ':' + Parameters.PARAM_ID_PART,
  requireAuthentication({
    scopes: ['owner.parts:delete'],
  }),
  partsCtrl.deleteOneAsOwner
);

export { mePartsRouter };
