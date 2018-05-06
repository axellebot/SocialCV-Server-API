"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class UserNotFoundError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_USER_NOT_FOUND;
    status = status || statuses.HTTP_STATUS_NOT_FOUND;
    super(message, status);
  }
};