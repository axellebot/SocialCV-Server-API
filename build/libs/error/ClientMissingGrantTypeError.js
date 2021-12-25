'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMissingGrantTypeError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class ClientMissingGrantTypeError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_CLIENT_MISSING_GRANT_TYPE, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.ClientMissingGrantTypeError = ClientMissingGrantTypeError;
