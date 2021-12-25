/* eslint-disable no-unused-vars */
'use strict';

import { Column, Entity, ManyToOne, TableInheritance } from 'typeorm';
import { Group, User } from '.';
import { Base } from './base.model';

enum EntryType {
  map = 'ENTRY_TYPE_MAP',
  event = 'ENTRY_TYPE_EVENT',
  tag = 'ENTRY_TYPE_TAG',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
class Entry extends Base {
  @Column()
  name?: string;

  @Column()
  order?: number;

  @ManyToOne(() => Group, (group) => group.entries)
  group?: Group;

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.profiles)
  owner?: User;
}

export { Entry, EntryType };
