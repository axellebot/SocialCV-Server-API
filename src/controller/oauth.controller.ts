import { getRepository, Repository } from 'typeorm';
import { OAuthClient } from '../entity/oauth';
import { oauth2server } from '../oauth';

const oauthClientRepo: Repository<OAuthClient> = getRepository(OAuthClient);

// Token Controller (handle access and refresh token)
export const getToken: any = oauth2server.token();

// Authorise Controller
export const authorize = oauth2server.authorize(
  async (clientID: string, redirectURI: string, done) => {
    try {
      const oauthClient: OAuthClient | undefined =
        await oauthClientRepo.findOne(clientID);
      if (!oauthClient) {
        return done(null, false);
      }

      // Check if redirectUri corresponds to one of client redirectUri
      if (oauthClient.redirectUris!.includes(redirectURI)) {
        return done(null, false);
      }

      return done(null, oauthClient, redirectURI);
    } catch (err: any) {
      done(err);
    }
  }
);
