'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class TokenAuthenticationError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_FAILED_AUTHENTICATION_TOKEN,
      StatusCodes.BAD_REQUEST
    );
  }
}
