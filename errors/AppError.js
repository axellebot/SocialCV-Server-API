"user-strict"

const messages = require('@constants/messages');
const statuses = require('@constants/statuses');

module.exports = class AppError extends Error {
  // Calling parent constructor of base Error class.
  constructor(message, status) {
    message = message || messages.MESSAGE_ERROR_APP;
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || statuses.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};