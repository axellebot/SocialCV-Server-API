'use strict';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Entry, Part, User } from '.';
import { Base } from './base.model';

enum GroupType {
  listHorizontal = 'GROUP_TYPE_LIST_HORIZONTAL',
  listVertical = 'GROUP_TYPE_LIST_VERTICAL',
  gridHorizontal = 'GROUP_TYPE_GRID_HORIZONTAL',
  gridVertical = 'GROUP_TYPE_GRID_VERTICAL',
}

@Entity()
class Group extends Base {
  @Column()
  name?: string;

  @Column({
    type: 'enum',
    enum: GroupType,
    default: GroupType.listVertical,
  })
  type?: GroupType;

  @Column()
  order?: number;

  @ManyToOne(() => Part, (part) => part.groups)
  part?: Part;

  @OneToMany(() => Entry, (entry) => entry.group)
  entries?: Entry[];

  @Column({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (user) => user.groups)
  owner?: User;
}

export { Group, GroupType };
