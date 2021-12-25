'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class DatabaseUpdateError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_DATABASE_SAVE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
