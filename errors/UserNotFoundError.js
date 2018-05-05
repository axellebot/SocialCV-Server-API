"use strict";

module.exports = class UserNotFoundError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_USER_NOT_FOUND;
    status = status || HTTP_STATUS_NOT_FOUND;
    super(message, status);
  }
};