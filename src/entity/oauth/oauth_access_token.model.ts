import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OAuthClient } from '.';
import { User } from '..';
import { Base } from '../base.model';
import { Version } from '../version.type';

@Entity()
export class OAuthAccessToken extends Base {
  @PrimaryColumn()
  token?: string;

  @Column()
  expires?: Date;

  @Column()
  scopes?: string[];

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.oauthAccessTokens)
  user?: User;

  @ManyToOne(() => OAuthClient, (client) => client.oauthAccessTokens)
  client?: OAuthClient;

  @Column(() => Version)
  versioning?: Version;

  public async isExpired() {
    return Date.now() > this.expires?.getTime()!;
  }
}
