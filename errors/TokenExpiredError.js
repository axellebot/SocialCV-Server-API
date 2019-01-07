"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class ExpiredAuthenticationToken extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_TOKEN_EXPIRED;
    status = status || statuses.HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};