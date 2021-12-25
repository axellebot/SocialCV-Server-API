'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class AccessTokenMissingPrivilegeError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_ACCESS_TOKEN_MISSING_PRIVILEGE,
      StatusCodes.UNAUTHORIZED
    );
  }
}
