"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mePartsRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const mePartsRouter = (0, express_1.Router)();
exports.mePartsRouter = mePartsRouter;
mePartsRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.parts:write'],
}), body_1.requireDataObject, controller_1.partsCtrl.createOneAsOwner);
mePartsRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.parts:write'],
}), body_1.requireDataArray, controller_1.partsCtrl.updateManyAsOwner);
mePartsRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.parts:delete'],
}), controller_1.partsCtrl.deleteAllAsOwner);
mePartsRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_PART, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.parts:write'],
}), body_1.requireDataObject, controller_1.partsCtrl.updateOneAsOwner);
mePartsRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_PART, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.parts:delete'],
}), controller_1.partsCtrl.deleteOneAsOwner);
