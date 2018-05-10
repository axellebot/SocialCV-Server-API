"use strict";

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class EmailAlreadyExistError extends require('@errors/AppError') {
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_EMAIL_ADDRESS_ALREADY_EXIST;
    status = status || statuses.HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};