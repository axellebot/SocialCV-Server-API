import { ChildEntity, Column } from 'typeorm';
import { Entry, EntryType } from '.';

@ChildEntity(EntryType.event)
class EntryEvent extends Entry {
  @Column()
  description?: string;

  @Column()
  startDate?: Date;

  @Column()
  endDate?: Date;

  @Column()
  location?: string;
}

export { EntryEvent };
