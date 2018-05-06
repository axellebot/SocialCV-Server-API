"use strict";

const messages = require('../constants/messages');
const statuses = require('../constants/statuses');

module.exports = class NotImplementedError extends require('./AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_NOT_IMPLEMENTED;
    status = status || statuses.HTTP_STATUS_NOT_IMPLEMENTED
    super(message, status);
  }
};