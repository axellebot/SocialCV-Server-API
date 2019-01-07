"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class AccessTokenMissingPrivilegeError extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_ACCESS_TOKEN_MISSING_PRIVILEGE;
    status = status || statuses.HTTP_STATUS_UNAUTHORIZED;
    super(message, status);
  }
};