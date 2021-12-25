'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class BodyMissingDataError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_BODY_MISSING_DATA,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
