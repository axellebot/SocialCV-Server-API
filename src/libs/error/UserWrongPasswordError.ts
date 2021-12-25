'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserWrongPasswordError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_USER_WRONG_PASSWORD, StatusCodes.BAD_REQUEST);
  }
}
