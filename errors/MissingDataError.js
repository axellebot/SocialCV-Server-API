"use strict";

module.exports = class MissingDataError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_MISSING_DATA;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};