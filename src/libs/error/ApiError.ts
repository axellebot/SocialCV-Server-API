'user-strict';

import { StatusCodes } from 'http-status-codes';
import { Messages } from '../constant';

export class ApiError {
  httpStatusCode: number;
  message: string;

  // Calling parent constructor of base Error class.
  constructor(
    message: string = Messages.MESSAGE_ERROR_APP,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    this.httpStatusCode = status;
    this.message = message;
  }
}
