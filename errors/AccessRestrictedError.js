"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class AccessRestrictedError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_ACCESS_RESTRICTED;
    status = status || statuses.HTTP_STATUS_UNAUTHORIZED
    super(message, status);
  }
};