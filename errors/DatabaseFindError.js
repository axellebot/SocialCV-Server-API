"use strict";

module.exports = class DatabaseFindError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_DATABASE_FIND;
    status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};