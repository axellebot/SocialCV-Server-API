'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class DatabaseCountError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_DATABASE_COUNT,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
