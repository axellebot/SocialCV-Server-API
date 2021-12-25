'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMissingEmailError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class UserMissingEmailError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_USER_MISSING_EMAIL_ADDRESS, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
exports.UserMissingEmailError = UserMissingEmailError;
