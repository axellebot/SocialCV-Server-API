import { Column, Entity, ManyToOne } from 'typeorm';
import { OAuthClient } from '.';
import { User } from '..';
import { Version } from '../version.type';

@Entity()
export class OAuthRefreshToken {
  @Column()
  token?: string;

  @Column()
  expires?: Date;

  @Column()
  scopes?: string[];

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.oauthRefreshTokens)
  user?: User;

  @Column({ nullable: true })
  clientId?: string;

  @ManyToOne(() => OAuthClient, (client) => client.oauthRefreshTokens)
  client?: OAuthClient;

  @Column(() => Version)
  versioning?: Version;

  public async isExpired() {
    return Date.now() > this.expires?.getTime()!;
  }
}
