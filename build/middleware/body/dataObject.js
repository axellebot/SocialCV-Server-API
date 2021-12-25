"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireDataObject = void 0;
const _1 = require(".");
const error_1 = require("../../libs/error");
exports.requireDataObject = [
    _1.requireData,
    async (req, res, next) => {
        if (typeof req.body.data !== 'object')
            throw new error_1.BodyWrongDataError();
        next();
    },
];
