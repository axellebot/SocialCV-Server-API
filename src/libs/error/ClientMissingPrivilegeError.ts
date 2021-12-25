'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class ClientMissingPrivilegeError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_CLIENT_MISSING_PRIVILEGE,
      StatusCodes.UNAUTHORIZED
    );
  }
}
