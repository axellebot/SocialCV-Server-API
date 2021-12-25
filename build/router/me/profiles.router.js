"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meProfilesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const meProfilesRouter = (0, express_1.Router)();
exports.meProfilesRouter = meProfilesRouter;
meProfilesRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.profiles:write'],
}), body_1.requireDataObject, controller_1.profilesCtrl.createOneAsOwner);
meProfilesRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.profiles:write'],
}), body_1.requireDataArray, controller_1.profilesCtrl.updateManyAsOwner);
meProfilesRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.profiles:delete'],
}), controller_1.profilesCtrl.deleteAllAsOwner);
meProfilesRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_PROFILE, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.profiles:write'],
}), body_1.requireDataObject, controller_1.profilesCtrl.updateOneAsOwner);
meProfilesRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_PROFILE, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.profiles:delete'],
}), controller_1.profilesCtrl.deleteOneAsOwner);
