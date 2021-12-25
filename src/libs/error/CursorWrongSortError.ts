'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class WrongQueryCursorSortError extends ApiError {
  constructor(message: string) {
    super(Messages.MESSAGE_ERROR_CURSOR_WRONG_SORT, StatusCodes.BAD_REQUEST);
  }
}
