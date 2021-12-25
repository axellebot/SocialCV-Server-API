'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class BodyMissingTokenError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_BODY_MISSING_TOKEN,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
