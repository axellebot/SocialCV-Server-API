'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class ProtocolWrongError extends ApiError {
  constructor() {
    super(Messages.MESSAGE_ERROR_PROTOCOL_WRONG, StatusCodes.BAD_REQUEST);
  }
}
