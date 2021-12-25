'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserMissingEmailError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_USER_MISSING_EMAIL_ADDRESS,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
