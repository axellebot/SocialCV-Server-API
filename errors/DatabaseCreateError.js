"use strict";

module.exports = class DatabaseCreateError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_DATABASE_CREATE;
    status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};