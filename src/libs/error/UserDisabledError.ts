'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserDisabledError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_USER_DISABLED, StatusCodes.UNAUTHORIZED);
  }
}
