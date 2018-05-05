"use strict";

module.exports = class AccessRestrictedError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_ACCESS_RESTRICTED;
    status = status || HTTP_STATUS_UNAUTHORIZED
    super(message, status);
  }
};