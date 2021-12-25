'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserNotFoundError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_USER_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
}
