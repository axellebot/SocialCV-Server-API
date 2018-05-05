"use strict";

module.exports = class WrongDataError extends require('./AppError') {
  constructor(message, status) {
    message = message || MESSAGE_ERROR_WRONG_DATA;
    status = status || HTTP_STATUS_BAD_REQUEST;
    super(message, status);
  }
};