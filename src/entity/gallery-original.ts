import { Column, Entity, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

export const textToJsonArr: ValueTransformer = {
  to: (value: any) => {
    try {
      return value ? JSON.stringify(value) : '[]';
    } catch (e) {
      return '[]';
    }
  },
  from: (value: string) => {
    try {
      // tslint:disable-next-line:no-eval
      let v = value ? eval(value) : [];
      if (!Array.isArray(v)) {
        v = [v];
      }
      return v;
    } catch (e) {
      return [];
    }
  },
};

@Entity({name: 'gallery'})
export class GalleryOriginal {
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

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  artist: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  group: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  parody: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  character: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  female: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  male: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  language: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  reclass: string[];

  @Column({type: 'varchar', length: 255, default: '', nullable: true, transformer: textToJsonArr})
  rest: string[];

  @Column({name: 'url_ex', type: 'varchar', length: 255, default: '', nullable: true})
  urlEx: string;

}
