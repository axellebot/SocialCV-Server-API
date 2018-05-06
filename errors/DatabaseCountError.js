"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class DatabaseCountError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_DATABASE_COUNT;
    status = status || statuses.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};