/* eslint-disable no-unused-vars */
'use strict';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Part, User } from '.';
import { Base } from './base.model';

enum ProfileType {
  main = 'PROFILE_TYPE_MAIN',
  header = 'PROFILE_TYPE_HEADER_MAIN',
  side = 'PROFILE_TYPE_MAIN_SIDE',
}

@Entity()
class Profile extends Base {
  @Column()
  title?: string;

  @Column()
  subtitle?: string;

  @Column()
  picture?: string;

  @Column()
  cover?: string;

  @Column()
  type?: ProfileType;

  @OneToMany(() => Part, (part) => part.profile)
  parts?: Part[];

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.profiles)
  owner?: User;
}

export { Profile, ProfileType };
