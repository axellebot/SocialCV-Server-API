"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class MissingTokenError extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_PROVIDING_TOKEN;
    status = status || statuses.HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};