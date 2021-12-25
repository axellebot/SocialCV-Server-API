import passport from 'passport';
import passportHttpBearer, { IVerifyOptions } from 'passport-http-bearer';
import passportOAuthClientPassword from 'passport-oauth2-client-password';
import { getRepository, Repository } from 'typeorm';
import { OAuthAccessToken, OAuthClient } from '../entity/oauth';
import {
  ClientWrongCredentialsError,
  TokenAuthenticationError,
  TokenExpiredError,
} from './error';
import { logger } from './logger';

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either user based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 * Use passport.authenticate(), specifying the 'bearer' strategy, to authenticate requests.
 */
passport.use(
  new passportHttpBearer.Strategy(
    { passReqToCallback: true },
    async (token: string, done: any) => {
      try {
        logger.info('Authenticate Bearer', token);

        const accessTokenRepo: Repository<OAuthAccessToken> =
          getRepository(OAuthAccessToken);

        const accessToken: OAuthAccessToken | undefined =
          await accessTokenRepo.findOne({
            token,
          });

        if (!accessToken) throw new TokenAuthenticationError();
        logger.info('accessToken', accessToken);
        if (await accessToken.isExpired()) throw new TokenExpiredError();

        // issue : https://github.com/jaredhanson/passport-http-bearer/issues/60
        return done(null, accessToken.user || accessToken.client, {
          scope: accessToken.scopes,
        } as IVerifyOptions);
      } catch (err: any) {
        done(err);
      }
    }
  )
);

/**
 * OAuthClientPasswordStrategy
 *
 * The OAuth 2.0 client password authentication strategy authenticate clients using a client ID and client secret.
 * Use passport.authenticate(), specifying the 'oauth2-client-password' strategy, to authenticate requests.
 */
passport.use(
  new passportOAuthClientPassword.Strategy(
    async (clientId: string, clientSecret: string, done: any) => {
      try {
        logger.info('Authenticate OAuthClientPassword', clientId, clientSecret);

        const clientRepo: Repository<OAuthClient> = getRepository(OAuthClient);

        const client: OAuthClient | undefined = await clientRepo.findOne({
          id: clientId,
          secret: clientSecret,
        });
        if (!client) throw new ClientWrongCredentialsError();
        return done(null, client, {
          scopes: client.scopes,
        });
      } catch (err: any) {
        done(err);
      }
    }
  )
);

export { passport };
