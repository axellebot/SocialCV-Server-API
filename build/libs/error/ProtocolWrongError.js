'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolWrongError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class ProtocolWrongError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_PROTOCOL_WRONG, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.ProtocolWrongError = ProtocolWrongError;
