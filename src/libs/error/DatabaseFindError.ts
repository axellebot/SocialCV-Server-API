'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class DatabaseFindError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_DATABASE_FIND,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
