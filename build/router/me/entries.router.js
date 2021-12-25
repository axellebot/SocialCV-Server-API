"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meEntriesRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const constant_1 = require("../../libs/constant");
const body_1 = require("../../middleware/body");
const authentication_1 = require("../../middleware/security/authentication");
const meEntriesRouter = (0, express_1.Router)();
exports.meEntriesRouter = meEntriesRouter;
meEntriesRouter.post('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.entries:write'],
}), body_1.requireDataObject, controller_1.entriesCtrl.createOneAsOwner);
meEntriesRouter.put('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.entries:write'],
}), body_1.requireDataArray, controller_1.entriesCtrl.updateManyAsOwner);
meEntriesRouter.delete('/', (0, authentication_1.requireAuthentication)({
    scopes: ['owner.entries:delete'],
}), controller_1.entriesCtrl.deleteAllAsOwner);
meEntriesRouter.put('/' + ':' + constant_1.Parameters.PARAM_ID_ENTRY, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.entries:write'],
}), body_1.requireDataObject, controller_1.entriesCtrl.updateOneAsOwner);
meEntriesRouter.delete('/' + ':' + constant_1.Parameters.PARAM_ID_ENTRY, (0, authentication_1.requireAuthentication)({
    scopes: ['owner.entries:delete'],
}), controller_1.entriesCtrl.deleteOneAsOwner);
