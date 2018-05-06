"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class DatabaseUpdateError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_DATABASE_SAVE;
    status = status || messages.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};