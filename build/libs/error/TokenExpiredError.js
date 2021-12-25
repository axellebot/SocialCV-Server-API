'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class TokenExpiredError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_TOKEN_EXPIRED, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.TokenExpiredError = TokenExpiredError;
