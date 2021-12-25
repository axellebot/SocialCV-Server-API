'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryWrongCursorPaginationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class QueryWrongCursorPaginationError extends _1.ApiError {
    constructor(message = constant_1.Messages.MESSAGE_ERROR_CURSOR_WRONG_PAGINATION) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.QueryWrongCursorPaginationError = QueryWrongCursorPaginationError;
