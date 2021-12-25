'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class ClientWrongCredentialsError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_CLIENT_WRONG_CREDENTIALS,
      StatusCodes.UNAUTHORIZED
    );
  }
}
