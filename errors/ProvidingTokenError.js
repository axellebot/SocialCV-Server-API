"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class ProvidingTokenError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_PROVIDING_TOKEN;
    status = status || statuses.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    super(message, status);
  }
};