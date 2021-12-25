'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class NotImplementedError extends ApiError {
  constructor(name: string) {
    super(
      `${name} ${Messages.MESSAGE_ERROR_NOT_IMPLEMENTED}`,
      StatusCodes.NOT_IMPLEMENTED
    );
  }
}
