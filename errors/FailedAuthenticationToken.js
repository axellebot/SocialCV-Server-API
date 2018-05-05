"use strict";

module.exports = class FailedAuthenticationToken extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};