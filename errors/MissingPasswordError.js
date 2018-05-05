"use strict";

module.exports = class MissingPasswordError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_MISSING_PASSWORD;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};