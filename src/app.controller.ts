import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Gallery } from './entity/gallery';
import { GalleryOriginal } from './entity/gallery-original';
import { Tag, TagNamespace, TagNamespaceName } from './entity/tag';

interface SearchBody {
  tags?: number[];
  excludeTags?: number[];
  category?: string[];
  keyword?: string;
}

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
    let gallerys: any = [];
    console.time('timer');

    const tags = [4];
    const notTags = [5];
    gallerys = await this.GalleryRepository.createQueryBuilder('gallery')
      .where('"tags" @> :tags', {tags})
      .limit(100)
      .getMany();

    console.timeEnd('timer');

    return `
    <pre>${JSON.stringify(gallerys, null, 4)}</pre>
    `;
  }

  @Post('search')
  async search(@Body() body: SearchBody): Promise<any> {

    console.time('timer');

    const query = this.GalleryRepository.createQueryBuilder('gallery');

    if (body.category && body.category.length) {
      console.log('body.category', body.category);
      query.andWhere('"category" IN (:...category)', {category: body.category});
    }

    if (body.tags && body.tags.length) {
      query.andWhere('"tags" @> :tags', {tags: body.tags});
    }

    if (body.excludeTags && body.excludeTags.length) {
      query.andWhere('(NOT "tags" && :excludeTags)', {excludeTags: body.excludeTags});
    }

    if (body.keyword && body.keyword.length) {
      query.andWhere('("title" LIKE :keyword OR "title_jpn" LIKE :keyword)', {keyword: `%${body.keyword}%`});
    }
    query.printSql().limit(100).orderBy('posted', 'DESC')

    const gallerys = await query.getMany();
    const tagIds = [];
    gallerys.forEach(v => tagIds.push(...v.tags));
    const tagList = await this.TagRepository.findByIds(tagIds);
    const tagMap = {};
    tagList.forEach(tag => tagMap[tag.id] = tag);
    gallerys.forEach(g => {
      g.tags = g.tags.map(id => tagMap[id]);
    })

    console.timeEnd('timer');

    return {
      statusCode: 0,
      message: 'ok',
      data: gallerys,
    };
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
    // let saveTag = [];
    // let saveGallery = [];
    tagList.forEach(tag => {
      const namespace = TagNamespaceName[tag.space];
      tagMap[`${namespace}:${tag.name}`] = tag;
    });

    const ergodicTag = async (space: TagNamespace, oldGallery, newGallery) => {
      const namespace = TagNamespaceName[space];
      for (const tagString of oldGallery[namespace]) {
        const tagKey = `${namespace}:${tagString}`;
        if (tagMap[tagKey]) {
          newGallery.tags.push(tagMap[tagKey].id);
        } else {
          const newTag = new Tag();
          newTag.name = tagString;
          newTag.space = space;
          tagMap[tagKey] = newTag;
          // saveTag.push(newTag);
          await this.TagRepository.save(newTag);
          newGallery.tags.push(newTag.id);
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

        // await this.TagRepository.save(saveTag);
        // saveTag = [];
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
      // break;
    }
    // await connection.sqljsManager.saveDatabase();
    return 'ok ' + count;
  }
*/

}
