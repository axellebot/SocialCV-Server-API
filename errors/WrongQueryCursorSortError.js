"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class WrongQueryCursorSortError extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_WRONG_CURSOR_SORT;
    status = status || messages.HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};