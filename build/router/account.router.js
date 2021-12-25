"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const accountRouter = (0, express_1.Router)();
exports.accountRouter = accountRouter;
accountRouter.get('/', (0, authentication_1.requireAuthentication)({ scopes: ['opendid'] }), controller_1.identityCtrl.findOne);
accountRouter.get(constant_1.Paths.profiles, (0, authentication_1.requireAuthentication)({ scopes: ['public.profiles:read'] }), selection_1.parseQuerySelection, controller_1.identityCtrl.filterProfilesOfOne, controller_1.profilesCtrl.findManyAsPublic);
