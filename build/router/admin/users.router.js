"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUsersRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const adminUsersRouter = (0, express_1.Router)();
exports.adminUsersRouter = adminUsersRouter;
adminUsersRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.users:write'],
}), body_1.requireDataObject, controller_1.usersCtrl.createOneAsAdmin);
adminUsersRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.users:write'],
}), body_1.requireDataArray, controller_1.usersCtrl.updateManyAsAdmin);
adminUsersRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['admin.users:delete'],
}), controller_1.usersCtrl.deleteAllAsAdmin);
adminUsersRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_USER, (0, authentication_1.requireAuthentication)({
    scopes: ['admin.users:write'],
}), body_1.requireDataObject, controller_1.usersCtrl.updateOneAsAdmin);
adminUsersRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_USER, (0, authentication_1.requireAuthentication)({
    scopes: ['admin.users:delete'],
}), controller_1.usersCtrl.deleteOneAsAdmin);
