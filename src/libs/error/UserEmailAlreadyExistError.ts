'use strict';

import { StatusCodes } from 'http-status-codes';
import { ApiError } from '.';
import { Messages } from '../constant';

export class UserEmailAlreadyExistError extends ApiError {
  constructor() {
    super(
      Messages.MESSAGE_ERROR_USER_EMAIL_ADDRESS_ALREADY_EXIST,
      StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
