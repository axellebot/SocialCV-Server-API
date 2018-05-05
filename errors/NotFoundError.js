"use strict";

module.exports = class NotFoundError extends require('./AppError') {
  constructor(message, status) {
    var _message = MESSAGE_ERROR_NOT_FOUND;
    if (message) {
      _message = message = message + " " + MESSAGE_ERROR_NOT_FOUND;
    }
    this.status = status || HTTP_STATUS_NOT_FOUND;
    super(_message, status);
  }
};