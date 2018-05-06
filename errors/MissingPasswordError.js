"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class MissingPasswordError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_MISSING_PASSWORD;
    status = status || statuses.HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};