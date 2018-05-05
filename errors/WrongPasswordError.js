"use strict";

module.exports = class WrongPasswordError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_WRONG_PASSWORD;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};