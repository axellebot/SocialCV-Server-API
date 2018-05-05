"use strict";

module.exports = class NotImplementedError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_NOT_IMPLEMENTED;
    status = status || HTTP_STATUS_NOT_IMPLEMENTED
    super(message, status);
  }
};