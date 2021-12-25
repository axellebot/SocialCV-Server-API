'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class NotFoundError extends ApiError {
  constructor(message: string = Messages.MESSAGE_ERROR_NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
