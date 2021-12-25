import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '..';
import { Version } from '../version.type';
import { OAuthClient } from './oauth_client.model';

@Entity()
export class OAuthAuthorizationCode {
  @PrimaryColumn()
  code?: string;

  @Column()
  expires?: Date;

  @Column()
  redirectUris?: string[];

  @Column()
  scopes?: string[];

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.oauthAuthorizationCode)
  user?: User;

  @Column({ nullable: true })
  clientId?: string;

  @ManyToOne(() => OAuthClient, (client) => client.oauthAuthorizationCode)
  client?: OAuthClient;

  @Column(() => Version)
  versioning?: Version;

  public async isExpired() {
    return Date.now() > this.expires?.getTime()!;
  }
}
