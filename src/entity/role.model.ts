/* eslint-disable no-unused-vars */
'use strict';

import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Scope, User } from '.';
import { Base } from './base.model';

enum RoleType {
  admin = 'ROLE_ADMIN',
  member = 'ROLE_MEMBER',
  guest = 'ROLE_GUEST',
}

@Entity()
class Role extends Base {
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.guest,
  })
  name?: RoleType;

  @ManyToMany(() => Scope, (scope) => scope.roles)
  @JoinTable()
  scopes?: Scope[];

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}

export { Role, RoleType };
