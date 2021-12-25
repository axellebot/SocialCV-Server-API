'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const profilesRouter = (0, express_1.Router)();
exports.profilesRouter = profilesRouter;
profilesRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.profiles:read'],
}), selection_1.parseQuerySelection, controller_1.profilesCtrl.findManyAsPublic);
profilesRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_PROFILE, (0, authentication_1.requireAuthentication)({
    scopes: ['public.profiles:read'],
}), controller_1.profilesCtrl.findOneAsPublic);
profilesRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_PROFILE + constant_1.Paths.parts, (0, authentication_1.requireAuthentication)({
    scopes: ['public.profiles:read', 'public.parts:read'],
}), selection_1.parseQuerySelection, controller_1.profilesCtrl.filterPartsOfOne, controller_1.partsCtrl.findManyAsPublic);
