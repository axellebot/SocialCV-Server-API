import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Version } from './version.type';

@Entity()
class Base {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column(() => Version)
  versioning?: Version;
}

export { Base };
