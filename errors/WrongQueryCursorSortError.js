"use strict";

module.exports = class WrongQueryCursorSortError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_WRONG_CURSOR_SORT;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};