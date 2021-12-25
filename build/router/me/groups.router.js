"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meGroupsRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const meGroupsRouter = (0, express_1.Router)();
exports.meGroupsRouter = meGroupsRouter;
meGroupsRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.groups:write'],
}), body_1.requireDataObject, controller_1.groupsCtrl.createOneAsOwner);
meGroupsRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.groups:write'],
}), body_1.requireDataArray, controller_1.groupsCtrl.updateManyAsOwner);
meGroupsRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.groups:delete'],
}), controller_1.groupsCtrl.deleteAllAsOwner);
meGroupsRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_GROUP, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.groups:write'],
}), body_1.requireDataObject, controller_1.groupsCtrl.updateOneAsOwner);
meGroupsRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_GROUP, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.groups:delete'],
}), controller_1.groupsCtrl.deleteOneAsOwner);
