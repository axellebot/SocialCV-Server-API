'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWrongPasswordError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class UserWrongPasswordError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_USER_WRONG_PASSWORD, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.UserWrongPasswordError = UserWrongPasswordError;
