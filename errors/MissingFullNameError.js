"use strict";

module.exports = class MissingFullNameError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_MISSING_FULL_NAME;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};