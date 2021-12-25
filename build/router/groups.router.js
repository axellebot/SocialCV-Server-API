"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const groupsRouter = (0, express_1.Router)();
exports.groupsRouter = groupsRouter;
groupsRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.groups:read'],
}), selection_1.parseQuerySelection, controller_1.groupsCtrl.findManyAsPublic);
groupsRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_GROUP, (0, authentication_1.requireAuthentication)({
    scopes: ['public.groups:read'],
}), controller_1.groupsCtrl.findOneAsPublic);
groupsRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_GROUP + constant_1.Paths.entries, (0, authentication_1.requireAuthentication)({
    scopes: ['public.groups:read', 'public.entries:read'],
}), selection_1.parseQuerySelection, controller_1.groupsCtrl.filterEntriesOfOne, controller_1.entriesCtrl.findManyAsPublic);
