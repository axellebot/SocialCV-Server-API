'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseCountError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class DatabaseCountError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_DATABASE_COUNT, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.DatabaseCountError = DatabaseCountError;