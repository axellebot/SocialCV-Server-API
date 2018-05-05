"use strict";

module.exports = class DatabaseRemoveError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_DATABASE_REMOVE;
    status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};