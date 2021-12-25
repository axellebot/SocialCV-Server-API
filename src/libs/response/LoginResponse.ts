'use strict';

import { User } from '../../entity';

export class LoginResponse {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
