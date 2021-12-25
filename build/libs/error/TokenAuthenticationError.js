'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthenticationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class TokenAuthenticationError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.TokenAuthenticationError = TokenAuthenticationError;
