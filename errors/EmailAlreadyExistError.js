"use strict";

module.exports = class EmailAlreadyExistError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_EMAIL_ADDRESS_ALREADY_EXIST;
    status = status || HTTP_STATUS_UNPROCESSABLE_ENTITY;
    super(message, status);
  }
};