"user-strict"

module.exports = class AppError extends Error {
  // Calling parent constructor of base Error class.
  constructor(message, status) {
    message = message || MESSAGE_ERROR_APP;
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};