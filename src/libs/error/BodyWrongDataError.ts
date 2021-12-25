'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class BodyWrongDataError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_BODY_WRONG_DATA, StatusCodes.BAD_REQUEST);
  }
}
