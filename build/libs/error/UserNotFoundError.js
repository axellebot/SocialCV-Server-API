'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class UserNotFoundError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_USER_NOT_FOUND, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.UserNotFoundError = UserNotFoundError;
