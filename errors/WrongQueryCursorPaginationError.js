"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class WrongQueryCursorPaginationError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_WRONG_CURSOR_PAGINATION;
    status = status || statuses.HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};