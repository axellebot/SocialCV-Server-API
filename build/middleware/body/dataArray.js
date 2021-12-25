"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireDataArray = void 0;
const _1 = require(".");
const error_1 = require("../../libs/error");
exports.requireDataArray = [
    _1.requireData,
    async (req, res, next) => {
        if (!Array.isArray(req.body.data))
            throw new error_1.BodyWrongDataError();
        next();
    },
];
