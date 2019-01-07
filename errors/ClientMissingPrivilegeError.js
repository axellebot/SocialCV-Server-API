"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class ClientMissingPrivilegeError extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_CLIENT_MISSING_PRIVILEGE;
    status = status || statuses.HTTP_STATUS_UNAUTHORIZED;
    super(message, status);
  }
};