import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OAuthAccessToken, OAuthAuthorizationCode } from '.';
import { User } from '..';
import { Base } from '../base.model';
import { OAuthRefreshToken } from './oauth_refresh_token.model';

@Entity()
export class OAuthClient extends Base {
  @Column()
  name?: string;

  @Column()
  secret?: string;

  @Column()
  redirectUris?: string[];

  @Column()
  grantTypes?: string[];

  @Column()
  scopes?: string[];

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.oauthClients)
  owner?: User;

  @OneToMany(() => OAuthAuthorizationCode, (authCode) => authCode.client)
  oauthAuthorizationCode?: [OAuthAuthorizationCode];

  @OneToMany(() => OAuthAccessToken, (token) => token.client)
  oauthAccessTokens?: [OAuthAccessToken];

  @OneToMany(() => OAuthRefreshToken, (token) => token.client)
  oauthRefreshTokens?: [OAuthRefreshToken];

  /**
   * verifyGrantTypes
   *
   * Check grantTypes
   */
  public async verifyGrantTypes(grantTypes: string[]) {
    for (const grantType in grantTypes) {
      if (!this.grantTypes?.includes(grantType)) return false;
    }
    return true;
  }

  /**
   * verifyScopes
   *
   * Check scopes
   */
  public async verifyScopes(scopes: string[]) {
    for (const scope of scopes) {
      if (!this.scopes?.includes(scope)) return false;
    }
    return true;
  }
}
