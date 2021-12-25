/* eslint-disable no-unused-vars */
'use strict';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Group, Profile, User } from '.';
import { Base } from './base.model';

enum PartType {
  listHorizontal = 'PART_TYPE_LIST_HORIZONTAL',
  listVertical = 'PART_TYPE_LIST_VERTICAL',
}

@Entity()
class Part extends Base {
  @Column()
  name?: string;

  @Column()
  type?: PartType;

  @Column()
  order?: number;

  @ManyToOne(() => Profile, (profile) => profile.parts)
  profile?: Profile;

  @OneToMany(() => Group, (group) => group.part)
  groups?: Group[];

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.parts)
  owner?: User;
}

export { Part, PartType };
