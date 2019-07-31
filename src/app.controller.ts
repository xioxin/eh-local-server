import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Gallery } from './entity/gallery';
import { GalleryOriginal } from './entity/gallery-original';
import { Tag, TagNamespace, TagNamespaceName } from './entity/tag';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @InjectRepository(GalleryOriginal, 'eh_api_db')
    private readonly EhGalleryRepository: Repository<GalleryOriginal>,

    @InjectRepository(Gallery)
    private readonly GalleryRepository: Repository<Gallery>,

    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>,
  ) {

  }

  @Get()
  async getHello(): Promise<string> {
    let gallerys = [];
    console.time('timer');

    const connection = getConnection();
    const tag = await this.TagRepository.createQueryBuilder().where('name = :name', {name: 'lolicon'}).getOne();

    console.log(tag.id)
    const gtt: any[] = await connection.createQueryBuilder()
      .from('gallery_tags_tag', 'gtt')
      .getMany();

    // const gids = gtt.map(v => v.galleryId)

    console.log(gtt);

    // const gallerys = await this.GalleryRepository.findByIds([1, 2, 3, 4, 5, 6, 7], {relations: ['tags']});



    // tag.id

    // console.log(tag)

    // gallerys = await this.GalleryRepository
    //   .createQueryBuilder('gallery')
    //   // .leftJoinAndSelect('gallery.tags', 'tag')
    //   .innerJoin('gallery.tags', 'tag')
    //   .where('tag.name = :name ', { name: 'lolicon' })
    //   .groupBy('gallery.id')
    //   .limit(100)
    //   .printSql()
    //   .getMany();

    console.timeEnd('timer');

    // await this.GalleryRepository.createQueryBuilder().

    return `
    <pre>${JSON.stringify(gallerys, null, 4)}</pre>
    `;
  }

/*
  @Get('transfer')
  async transfer(): Promise<string> {
    let count = 0;
    let galleries: GalleryOriginal[] = [];
    const take = 1000;
    let page = 0;
    const allCount = await this.EhGalleryRepository.count();
    const connection = getConnection();

    const transferKeys = [
      'id',
      'title',
      'titleJpn',
      'url',
      'category',
      'uploader',
      'posted',
      'thumb',
      'filesize',
      'filecount',
      'expunged',
      'torrentcount',
      'token',
      'gid',
      'rating',
      'urlEx',
    ];

    const tagList = await this.TagRepository.find();
    const tagMap = {};
    let saveTag = [];
    let saveGallery = [];
    tagList.forEach(tag => {
      const namespace = TagNamespaceName[tag.space];
      tagMap[`${namespace}:${tag.name}`] = tag;
    });

    const ergodicTag = async (space: TagNamespace, oldGallery, newGallery) => {
      const namespace = TagNamespaceName[space];
      for (const tagString of oldGallery[namespace]) {
        const tagKey = `${namespace}:${tagString}`;
        if (tagMap[tagKey]) {
          newGallery.tags.push(tagMap[tagKey]);
        } else {
          const newTag = new Tag();
          newTag.name = tagString;
          newTag.space = space;
          tagMap[tagKey] = newTag;
          saveTag.push(newTag);
          newGallery.tags.push(newTag);
        }
      }
    };

    // tslint:disable-next-line:no-conditional-assignment
    while (galleries = await this.EhGalleryRepository.find({skip: page * take, take}), galleries.length) {
      page++;
      count += galleries.length;
      console.log('page ', page, ((count / allCount) * 100).toFixed(2) + '%');
      console.time('transfer');
      for (const gallery of galleries) {

        const newGallery = new Gallery();
        transferKeys.forEach(key => {
          newGallery[key] = gallery[key];
        });
        newGallery.tags = [];

        await ergodicTag(TagNamespace.artist, gallery, newGallery);
        await ergodicTag(TagNamespace.character, gallery, newGallery);
        await ergodicTag(TagNamespace.female, gallery, newGallery);
        await ergodicTag(TagNamespace.male, gallery, newGallery);
        await ergodicTag(TagNamespace.language, gallery, newGallery);
        await ergodicTag(TagNamespace.group, gallery, newGallery);
        await ergodicTag(TagNamespace.rest, gallery, newGallery);

        await this.TagRepository.save(saveTag);
        saveTag = [];
        await this.GalleryRepository.save(newGallery);

        // saveGallery.push(newGallery);
      }

      // if (page % 100 === 0) {
      //   console.time('save db');
      //   await connection.sqljsManager.saveDatabase();
      //   console.timeEnd('save db');
      // }
      // await this.GalleryRepository.save(saveGallery);
      // saveGallery = [];

      console.timeEnd('transfer');
    }
    await connection.sqljsManager.saveDatabase();
    return 'ok ' + count;
  }

*/

}
