'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRestrictedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class AccessRestrictedError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_ACCESS_RESTRICTED, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.AccessRestrictedError = AccessRestrictedError;
