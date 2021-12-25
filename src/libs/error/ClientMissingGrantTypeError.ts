'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class ClientMissingGrantTypeError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_CLIENT_MISSING_GRANT_TYPE,
      StatusCodes.UNAUTHORIZED
    );
  }
}
