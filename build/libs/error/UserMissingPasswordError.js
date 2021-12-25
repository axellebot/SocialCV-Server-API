'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMissingPasswordError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class UserMissingPasswordError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_USER_MISSING_PASSWORD, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
exports.UserMissingPasswordError = UserMissingPasswordError;
