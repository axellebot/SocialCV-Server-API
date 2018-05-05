"use strict";

module.exports = class MissingTokenError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_PROVIDING_TOKEN;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};