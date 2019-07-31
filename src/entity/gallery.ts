import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';
import { Tag } from './tag';

@Entity({name: 'gallery'})
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  title: string;

  @Column({name: 'title_jpn', type: 'varchar', length: 255, default: '', nullable: true})
  titleJpn: string;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  url: string;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  category: string;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  uploader: string;

  @Column({type: 'integer', default: 0, nullable: true})
  posted: number;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  thumb: string;

  @Column({type: 'integer', default: 0, nullable: true})
  filesize: number;

  @Column({type: 'integer', default: 0, nullable: true})
  filecount: number;

  @Column({type: 'integer', default: 0, nullable: true})
  expunged: number;

  @Column({type: 'integer', default: 0, nullable: true})
  torrentcount: number;

  @Column({type: 'varchar', length: 255, default: '', nullable: true})
  token: string;

  @Column({type: 'integer', default: 0, nullable: true})
  gid: number;

  @Column({type: 'real', default: 0, nullable: true})
  rating: number;

  @ManyToMany(type => Tag, tag => tag.galleries)
  @JoinTable()
  tags: Tag[];

  @Column({name: 'url_ex', type: 'varchar', length: 255, default: '', nullable: true})
  urlEx: string;

}
