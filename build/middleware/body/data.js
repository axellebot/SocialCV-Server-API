"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireData = void 0;
const error_1 = require("../../libs/error");
// Errors
async function requireData(req, res, next) {
    if (!req.body.data)
        throw new error_1.BodyMissingDataError();
    return next();
}
exports.requireData = requireData;
