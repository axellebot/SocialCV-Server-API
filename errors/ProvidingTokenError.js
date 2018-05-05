"use strict";

module.exports = class ProvidingTokenError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_PROVIDING_TOKEN;
    status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};