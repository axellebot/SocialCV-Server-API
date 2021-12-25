'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationCodeExpiredError = void 0;
const http_status_codes_1 = require("http-status-codes");
const constant_1 = require("../constant");
const AppError_1 = require("./AppError");
class AuthorizationCodeExpiredError extends AppError_1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_AUTHORIZATION_CODE_EXPIRED, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.AuthorizationCodeExpiredError = AuthorizationCodeExpiredError;
