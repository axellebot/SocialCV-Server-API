"use strict";

module.exports = class DatabaseUpdateError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_DATABASE_SAVE;
    status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};