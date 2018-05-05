"use strict";

module.exports = class WrongQueryQueryError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_WRONG_QUERY;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};