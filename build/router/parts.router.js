'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.partsRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const partsRouter = (0, express_1.Router)();
exports.partsRouter = partsRouter;
partsRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.parts:read'],
}), selection_1.parseQuerySelection, controller_1.partsCtrl.findManyAsPublic);
partsRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_PART, (0, authentication_1.requireAuthentication)({
    scopes: ['public.parts:read'],
}), controller_1.partsCtrl.findOneAsPublic);
partsRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_PART + constant_1.Paths.groups, (0, authentication_1.requireAuthentication)({
    scopes: ['public.parts:read', 'public.groups:read'],
}), selection_1.parseQuerySelection, controller_1.partsCtrl.filterGroupsOfOne, controller_1.groupsCtrl.findManyAsPublic);
