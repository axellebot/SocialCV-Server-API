"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const constant_1 = require("../libs/constant");
const authentication_1 = require("../middleware/security/authentication");
const selection_1 = require("../middleware/selection");
const entriesRouter = (0, express_1.Router)();
exports.entriesRouter = entriesRouter;
entriesRouter.get('/', (0, authentication_1.requireAuthentication)({
    scopes: ['public.entries:read'],
}), selection_1.parseQuerySelection, controller_1.entriesCtrl.findManyAsPublic);
entriesRouter.get('/' + ':' + constant_1.Parameters.PARAM_ID_ENTRY, (0, authentication_1.requireAuthentication)({
    scopes: ['public.entries:read'],
}), controller_1.entriesCtrl.findOneAsPublic);
