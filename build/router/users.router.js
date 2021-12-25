'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.users:read'],
}), selection_1.parseQuerySelection, controller_1.usersCtrl.findManyAsPublic);
usersRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_USER, (0, authentication_1.requireAuthentication)({
    scopes: ['public.users:read'],
}), controller_1.usersCtrl.findOneAsPublic);
