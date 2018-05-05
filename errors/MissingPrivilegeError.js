"use strict";

module.exports = class MissingPrivilegeError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_MISSING_PRIVILEGE;
    status = status || HTTP_STATUS_UNAUTHORIZED;
    super(message, status);
  }
};