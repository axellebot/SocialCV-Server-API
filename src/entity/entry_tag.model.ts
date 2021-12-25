import { ChildEntity, Column } from 'typeorm';
import { Entry, EntryType } from '.';

@ChildEntity(EntryType.tag)
class EntryTag extends Entry {
  @Column()
  content?: string[];
}

export { EntryTag };
