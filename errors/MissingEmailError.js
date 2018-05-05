"use strict";

module.exports = class MissingEmailError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_MISSING_EMAIL;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};