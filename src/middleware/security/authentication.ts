import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import {
  ApiError,
  ClientMissingPrivilegeError,
  UserMissingPrivilegeError,
} from '../../libs/error';
import { logger } from '../../libs/logger';

/**
 * You would call this with an access token
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750#section-2.1
 *
 * Example
 * Authorization: Bearer someAccessTokenHere
 *
 * You would call this with an client id and client secret
 * in the body of the message according to OAuth 2.0 standards
 * https://tools.ietf.org/html/rfc6750
 */

interface AuthOptions {
  scopes?: string[];
}

/**
 * @param options
 */
const requireAuthentication = (options: AuthOptions = {}) => [
  passport.authenticate(['bearer', 'oauth2-client-password'], {
    session: false,
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('authInfo', req.authInfo);

      if (!req.authInfo) throw new ApiError();

      if (options.scopes) {
        if (!req.authInfo.scopes) {
          if (req.user) {
            throw new UserMissingPrivilegeError();
          } else {
            throw new ClientMissingPrivilegeError();
          }
        }
        for (const scope of options.scopes) {
          if (!req.authInfo.scopes.includes(scope)) {
            if (req.user) {
              throw new UserMissingPrivilegeError();
            } else {
              throw new ClientMissingPrivilegeError();
            }
          }
        }
      }
      next();
    } catch (err: any) {
      next(err);
    }
  },
];

export { requireAuthentication, AuthOptions };
