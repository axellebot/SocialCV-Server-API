'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class NotImplementedError extends _1.ApiError {
    constructor(name) {
        super(`${name} ${constant_1.Messages.MESSAGE_ERROR_NOT_IMPLEMENTED}`, http_status_codes_1.StatusCodes.NOT_IMPLEMENTED);
    }
}
exports.NotImplementedError = NotImplementedError;
