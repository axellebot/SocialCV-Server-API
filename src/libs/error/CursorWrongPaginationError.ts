'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class QueryWrongCursorPaginationError extends ApiError {
  constructor(
    message: string = Messages.MESSAGE_ERROR_CURSOR_WRONG_PAGINATION
  ) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
