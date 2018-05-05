"use strict";

module.exports = class WrongQueryCursorPaginationError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_WRONG_CURSOR_PAGINATION;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};