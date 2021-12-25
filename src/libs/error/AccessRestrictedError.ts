'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class AccessRestrictedError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_ACCESS_RESTRICTED, StatusCodes.UNAUTHORIZED);
  }
}
