import { ChildEntity, Column } from 'typeorm';
import { Entry, EntryType } from '.';

@ChildEntity(EntryType.map)
class EntryMap extends Entry {
  @Column()
  content?: string;
}

export { EntryMap };
