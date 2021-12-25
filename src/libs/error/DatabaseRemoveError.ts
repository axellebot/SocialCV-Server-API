'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class DatabaseRemoveError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_DATABASE_REMOVE,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
