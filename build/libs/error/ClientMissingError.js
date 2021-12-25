'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMissingError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class ClientMissingError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_CLIENT_MISSING, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.ClientMissingError = ClientMissingError;
