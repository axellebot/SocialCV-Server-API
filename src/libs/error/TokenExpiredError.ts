'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class TokenExpiredError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_TOKEN_EXPIRED, StatusCodes.BAD_REQUEST);
  }
}
