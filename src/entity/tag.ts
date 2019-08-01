import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery';

export enum TagNamespace {
  rest = 0,
  artist = 1,
  character = 2,
  female = 3,
  male = 4,
  language = 5,
  reclass = 6,
  group = 7,
}

export const TagNamespaceName = ['rest', 'artist', 'character', 'female', 'male', 'language', 'reclass', 'group'];

@Entity({name: 'tag'})
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', default: 0, nullable: true})
  space: TagNamespace;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  name: string;

  @Column({name: 'name_jpn', type: 'varchar', length: 255, default: '', nullable: true})
  nameJpn: string;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  remark: string;

  @ManyToMany(type => Gallery, gallery => gallery.tags)
  galleries?: Gallery[];

}
