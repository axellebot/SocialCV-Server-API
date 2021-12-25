"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRolesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const adminRolesRouter = (0, express_1.Router)();
exports.adminRolesRouter = adminRolesRouter;
adminRolesRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_ROLE, (0, authentication_1.requireAuthentication)({
    scopes: ['admin.roles:write'],
}), body_1.requireDataObject, controller_1.rolesCtrl.updateOneAsAdmin);
adminRolesRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_ROLE, (0, authentication_1.requireAuthentication)({
    scopes: ['admin.roles:delete'],
}), controller_1.rolesCtrl.deleteOneAsAdmin);
adminRolesRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.roles:write'],
}), body_1.requireDataObject, controller_1.rolesCtrl.createOneAsAdmin);
adminRolesRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.roles:write'],
}), body_1.requireDataArray, controller_1.rolesCtrl.updateManyAsAdmin);
adminRolesRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.roles:delete'],
}), controller_1.rolesCtrl.deleteAllAsAdmin);
