'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserMissingPasswordError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_USER_MISSING_PASSWORD,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
