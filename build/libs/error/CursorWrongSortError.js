'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongQueryCursorSortError = void 0;
const http_status_codes_1 = require("http-status-codes");
const _1 = require(".");
const constant_1 = require("../constant");
class WrongQueryCursorSortError extends _1.ApiError {
    constructor(message) {
        super(constant_1.Messages.MESSAGE_ERROR_CURSOR_WRONG_SORT, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.WrongQueryCursorSortError = WrongQueryCursorSortError;
