'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRemoveError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class DatabaseRemoveError extends _1.ApiError {
    constructor() {
        super(constant_1.Messages.MESSAGE_ERROR_DATABASE_REMOVE, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.DatabaseRemoveError = DatabaseRemoveError;
