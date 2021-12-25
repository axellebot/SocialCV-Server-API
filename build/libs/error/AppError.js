"use strict";
'user-strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
const constant_1 = require("../constant");
class ApiError {
    // Calling parent constructor of base Error class.
    constructor(message = constant_1.Messages.MESSAGE_ERROR_APP, status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        this.httpStatusCode = status;
        this.message = message;
    }
}
exports.ApiError = ApiError;
