'use strict';

import { StatusCodes } from 'http-status-codes';
import { Messages } from '../constant';
import { ApiError } from './ApiError';

export class AuthorizationCodeExpiredError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_AUTHORIZATION_CODE_EXPIRED,
      StatusCodes.BAD_REQUEST
    );
  }
}
