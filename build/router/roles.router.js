'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const rolesRouter = (0, express_1.Router)();
exports.rolesRouter = rolesRouter;
rolesRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.roles:read'],
}), selection_1.parseQuerySelection, controller_1.rolesCtrl.findMany);
rolesRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_ROLE, (0, authentication_1.requireAuthentication)({
    scopes: ['public.roles:read'],
}), controller_1.rolesCtrl.findOne);
