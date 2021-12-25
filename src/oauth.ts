import {
  createServer,
  exchange,
  ExchangeDoneFunction,
  grant,
  OAuth2Server,
} from 'oauth2orize';
import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';
import { User } from './entity';
import {
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthClient,
  OAuthRefreshToken,
} from './entity/oauth';
import {
  AuthorizationCodeExpiredError,
  ClientMissingError,
  ClientMissingGrantTypeError,
  ClientMissingPrivilegeError,
  DatabaseCreateError,
  DatabaseRemoveError,
  NotFoundError,
  TokenExpiredError,
  UserDisabledError,
  UserMissingPrivilegeError,
  UserNotFoundError,
  UserWrongPasswordError,
} from './libs/error';
import { logger } from './libs/logger';
import {
  generateAccessTokenExpiration,
  generateCode,
  generateRefreshTokenExpiration,
  generateToken,
} from './libs/utils';

// Create OAuth 2.0 server
const oauth2server: OAuth2Server = createServer();

// Repositories
const accessTokenRepo: Repository<OAuthAccessToken> =
  getRepository(OAuthAccessToken);
const refreshTokenRepo: Repository<OAuthRefreshToken> =
  getRepository(OAuthRefreshToken);
const authCodeRepo: Repository<OAuthAuthorizationCode> = getRepository(
  OAuthAuthorizationCode
);
const userRepo: Repository<User> = getRepository(User);

/**
 * Register supported Oauth 2.0 grant types.
 *
 * OAuth 2.0 specifies a framework that allows users to grant client
 * applications limited access to their protected resources.  It does this
 * through a process of the user granting access, and the client exchanging
 * the grant for an access token.
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticate
 * `user` granting access, and their response, which contains approved scopes,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
oauth2server.grant(
  grant.code(async (client, redirectURI, user, ares, done) => {
    try {
      logger.info('grant code', client, redirectURI, user, ares);

      const code = generateCode();

      const authCode: OAuthAuthorizationCode = authCodeRepo.create({
        code,
        client: client.id,
        redirectUri: redirectURI,
        user: user.id,
        scope: ares.scope,
      } as DeepPartial<OAuthAuthorizationCode>);

      const authCodeSaved: OAuthAuthorizationCode = await authCodeRepo.save(
        authCode
      );

      if (!authCodeSaved) throw new DatabaseCreateError();

      return done(null, code);
    } catch (err: any) {
      done(err);
    }
  })
);

/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 *
 * grant_type="client_credentials"
 *
 */
oauth2server.exchange(
  exchange.code(
    async (
      client: OAuthClient,
      code: string,
      redirectURI: string,
      done: ExchangeDoneFunction
    ) => {
      try {
        logger.info('exchange code', client, code, redirectURI);

        // Check grant_type="authorization_code"
        if (!client) throw Error();
        if (!client.grantTypes!.includes('authorization_code'))
          throw new ClientMissingGrantTypeError();

        const codeRepo: Repository<OAuthAuthorizationCode> = getRepository(
          OAuthAuthorizationCode
        );
        const conditions: FindConditions<OAuthAuthorizationCode> = {
          code,
        };
        const authorizationCode: OAuthAuthorizationCode | undefined =
          await codeRepo.findOne(conditions);
        if (!authorizationCode)
          throw new NotFoundError('AuthorizationCode not found');

        // Check client math
        if (client.id! !== authorizationCode.client!.id)
          return done(null, false);

        // Check expiration date
        if (await authorizationCode.isExpired())
          throw new AuthorizationCodeExpiredError();

        // Check Uri
        if (
          redirectURI &&
          authorizationCode.redirectUris!.includes(redirectURI)
        )
          return done(null, false);

        const savedAccessToken: OAuthAccessToken = await createAccessToken(
          authorizationCode.user!.id!,
          client.id!,
          authorizationCode.scopes!
        );
        if (!savedAccessToken) throw new DatabaseCreateError();

        const savedRefreshToken: OAuthRefreshToken = await createRefreshToken(
          authorizationCode.user!.id!,
          client.id!,
          authorizationCode.scopes!
        );
        if (!savedRefreshToken) throw new DatabaseCreateError();

        return done(null, savedAccessToken.token, savedRefreshToken.token);
      } catch (err: any) {
        done(err);
      }
    }
  )
);

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticate
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
oauth2server.grant(
  grant.token(async (client: OAuthClient, user: User, ares, done: any) => {
    try {
      logger.info('grant token', client, user, ares);

      const savedAccessToken: OAuthAccessToken = await createAccessToken(
        user.id!,
        client.id!,
        ares.scopes
      );
      if (!savedAccessToken) throw new DatabaseCreateError();

      return done(null, savedAccessToken.token, {
        expiresIn: savedAccessToken.expires,
      });
    } catch (err: any) {
      done(err);
    }
  })
);

/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 *
 * grant_type="client_credentials"
 *
 */
oauth2server.exchange(
  exchange.clientCredentials(
    async (
      client: OAuthClient,
      requestedScopes: string[],
      done: ExchangeDoneFunction
    ) => {
      try {
        logger.info('exchange clientCredentials', client, requestedScopes);

        if (!client) throw new ClientMissingError(); // Need client authentication
        // Check grant_type="client_credentials"
        if (!client.grantTypes!.includes('client_credentials'))
          throw new ClientMissingGrantTypeError();

        // Check scopes
        const scopes: string[] = requestedScopes || [];

        if (requestedScopes.length <= 0)
          Array.prototype.push.apply(scopes, client.scopes!);

        if (!(await client.verifyScopes(requestedScopes)))
          throw new ClientMissingPrivilegeError();
        Array.prototype.push.apply(scopes, requestedScopes);

        const savedAccessToken = await createAccessToken(
          undefined,
          client.id,
          scopes
        );
        if (!savedAccessToken) throw new DatabaseCreateError();

        const savedRefreshToken: OAuthRefreshToken = await createRefreshToken(
          undefined,
          client.id,
          scopes
        );
        if (!savedRefreshToken) throw new DatabaseCreateError();

        return done(null, savedAccessToken.token, savedRefreshToken.token, {
          expiresIn: savedAccessToken.expires,
        });
      } catch (err: any) {
        done(err);
      }
    }
  )
);

/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 *
 * grant_type="refresh_token"
 */
oauth2server.exchange(
  exchange.refreshToken(
    async (
      client: OAuthClient,
      refreshToken: string,
      requestedScopes: string[],
      done: ExchangeDoneFunction
    ) => {
      try {
        logger.info(
          'exchange refreshToken',
          client,
          refreshToken,
          requestedScopes
        );

        const foundRefreshToken: OAuthRefreshToken | undefined =
          await refreshTokenRepo.findOne({
            token: refreshToken,
          } as FindOneOptions<OAuthRefreshToken>);
        if (!foundRefreshToken) throw new NotFoundError('Refresh token');

        // Check expiration date
        if (await foundRefreshToken.isExpired()) throw new TokenExpiredError();

        const scopes: string[] = foundRefreshToken.scopes!;
        const user: User = foundRefreshToken.user!;

        if (await user.verifyScopes(requestedScopes))
          Array.prototype.push.apply(scopes, requestedScopes); // Added olders scopes to new scopes

        const deletedRefreshToken: OAuthRefreshToken | undefined =
          await refreshTokenRepo.softRemove(foundRefreshToken);
        if (!deletedRefreshToken) throw new DatabaseRemoveError();

        const savedAccessToken = await createAccessToken(
          user.id!,
          client.id!,
          scopes
        );
        if (!savedAccessToken) throw new DatabaseCreateError();

        const savedRefreshToken = await createRefreshToken(
          user.id!,
          client.id!,
          scopes
        );
        if (!savedRefreshToken) throw new DatabaseCreateError();

        return done(null, savedAccessToken.token, savedRefreshToken.token, {
          expiresIn: savedAccessToken.expires,
        });
      } catch (err: any) {
        done(err);
      }
    }
  )
);

/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client
 *
 * grant_type="password"
 */
oauth2server.exchange(
  exchange.password(
    async (
      client,
      username: string,
      password: string,
      requestedScopes: string[],
      done: ExchangeDoneFunction
    ) => {
      try {
        logger.info('exchange password', client, username, requestedScopes);

        // Check grant_type="password"
        if (!client) throw new ClientMissingError(); // Need client authentication
        if (!client.grantTypes.includes('password'))
          throw new ClientMissingGrantTypeError();

        const user: User | undefined = await userRepo.findOne({
          where: [
            {
              email: username,
            },
            {
              username,
            },
          ],
        } as FindOneOptions<User>);

        if (!user) throw new UserNotFoundError();
        if (user.disabled) throw new UserDisabledError();
        // If there is a match and the passwords are equal
        if (!(await user.verifyPassword(password)))
          throw new UserWrongPasswordError();

        // Check scopes
        const scopes: string[] = [];

        if (requestedScopes.length <= 0)
          Array.prototype.push.apply(scopes, await user.getScopes());

        if (await user.verifyScopes(requestedScopes)) {
          Array.prototype.push.apply(scopes, requestedScopes);
        } else {
          throw new UserMissingPrivilegeError();
        }

        // Save Access Token
        const savedAccessToken: OAuthAccessToken = await createAccessToken(
          user.id,
          client.id,
          scopes
        );
        if (!savedAccessToken) throw new DatabaseCreateError();

        // Save Refresh Token
        const savedRefreshToken: OAuthRefreshToken = await createRefreshToken(
          user.id!,
          client.id!,
          scopes
        );
        if (!savedRefreshToken) throw new DatabaseCreateError();

        return done(
          null, // No error
          savedAccessToken.token, // The generated access token
          savedRefreshToken.token, // The generated refresh token
          {
            expiresIn: savedAccessToken.expires, // Additional properties to be merged with the token and send in the response
          }
        );
      } catch (err: any) {
        done(err);
      }
    }
  )
);

const createAccessToken = async (
  userId?: string,
  clientId?: string,
  scopes?: string[]
): Promise<OAuthAccessToken> => {
  const token: string = generateToken();
  const expirationDate: Date = generateAccessTokenExpiration();

  const accessToken: OAuthAccessToken = accessTokenRepo.create({
    token,
    client: clientId,
    user: userId,
    expires: expirationDate,
    scopes,
  } as DeepPartial<OAuthAccessToken>);

  return accessToken;
};

const createRefreshToken = async (
  userId?: string,
  clientId?: string,
  scopes?: string[]
): Promise<OAuthRefreshToken> => {
  const token = generateToken();
  const expirationDate = generateRefreshTokenExpiration();

  const refreshToken: OAuthRefreshToken = refreshTokenRepo.create({
    token,
    client: clientId,
    user: userId,
    expires: expirationDate,
    scopes,
  } as DeepPartial<OAuthRefreshToken>);

  return refreshToken;
};

oauth2server.serializeClient(async (client: OAuthClient, done) => {
  return done(null, client.id!);
});

oauth2server.deserializeClient(async (id: string, done) => {
  try {
    const clientRepo: Repository<OAuthClient> = getRepository(OAuthClient);
    const client: OAuthClient | undefined = await clientRepo.findOne(id);
    if (!client) throw new NotFoundError('OAuth2 Client not found');
    done(null, client);
  } catch (err: any) {
    done(err);
  }
});

export { oauth2server };
