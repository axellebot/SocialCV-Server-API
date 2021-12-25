import { ApiError } from '../libs/error/ApiError';
('use strict');

import bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Entry, Group, Part, Profile, Role, Scope } from '.';
import { logger } from '../libs/logger';
import { Base } from './base.model';
import {
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthClient,
  OAuthRefreshToken,
} from './oauth';
import sanitizedConfig from '../config';

// -------------------------------------------
// User Schema
// -------------------------------------------

@Entity()
class User extends Base {
  @Column()
  email?: string;

  @Column()
  username?: string;

  @Column()
  passphrase?: string;

  @Column()
  passwordMethod?: string;

  @Column()
  disabled?: boolean;

  @Column()
  picture?: string;

  @OneToMany(() => Profile, (profile) => profile.owner)
  profiles?: Profile[];

  @OneToMany(() => Part, (photo) => photo.owner)
  parts?: Part[];

  @OneToMany(() => Group, (group) => group.owner)
  groups?: Group[];

  @OneToMany(() => Entry, (entry) => entry.owner)
  entries?: Entry[];

  @Column({ nullable: true })
  roleId?: string;

  @ManyToOne(() => Role, (role) => role.users)
  role?: Role;

  @OneToMany(() => OAuthClient, (client) => client.owner)
  oauthClients?: OAuthClient[];

  @OneToMany(() => OAuthAccessToken, (token) => token.user)
  oauthAccessTokens?: OAuthAccessToken[];

  @OneToMany(() => OAuthAccessToken, (token) => token.user)
  oauthRefreshTokens?: OAuthRefreshToken[];

  @OneToMany(() => OAuthAuthorizationCode, (authCode) => authCode.user)
  oauthAuthorizationCode?: OAuthAuthorizationCode[];

  // TODO: Add pre save method to encrypt passphrase
  @BeforeUpdate()
  @BeforeInsert()
  async preSavePassword() {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;

    // generate a salt
    this.passphrase = bcrypt.hashSync(
      this.passphrase,
      sanitizedConfig.saltWorkFactor
    );
  }

  /**
   * Method to verify the plain password
   */
  public async verifyPassword(candidatePassword: string) {
    logger.info('User:verifyPassword', this.passwordMethod);
    if (this.passwordMethod === 'bcrypt')
      return await bcrypt.compare(candidatePassword, this.passphrase!);
    return candidatePassword === this.passphrase;
  }

  /**
   * publicData
   *
   * return User public data object
   */
  public publicData() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      role: this.role,
      disabled: this.disabled,
      profiles: this.profiles,
      picture: this.picture,
    };
  }

  /**
   * getScopes
   *
   * return array of strings scope
   */
  public async getScopes(): Promise<string[]> {
    if (!this.role) throw new ApiError();
    if (!this.role.scopes) throw new ApiError();

    return this.role.scopes.forEach((scope: Scope) => scope.name);
  }

  /**
   * verifyScopes
   *
   * Check scopes
   */
  public async verifyScopes(scopes: string[]) {
    const userScopes = await this.getScopes();
    for (const scope of scopes) {
      if (!userScopes?.includes(scope)) return false;
    }
    return true;
  }
}

export { User };
