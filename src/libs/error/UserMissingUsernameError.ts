'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserMissingUsernameError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_USER_MISSING_FULL_NAME,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
