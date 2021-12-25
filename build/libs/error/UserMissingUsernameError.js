'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMissingUsernameError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class UserMissingUsernameError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_USER_MISSING_FULL_NAME, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
exports.UserMissingUsernameError = UserMissingUsernameError;
