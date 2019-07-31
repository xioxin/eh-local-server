import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entity/gallery';
import { GalleryOriginal } from './entity/gallery-original';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @InjectRepository(GalleryOriginal, 'eh_api_db')
    private readonly EhGalleryRepository: Repository<GalleryOriginal>,

    @InjectRepository(Gallery)
    private readonly GalleryRepository: Repository<Gallery>,
  ) {

  }

  @Get()
  async getHello(): Promise<string> {
    const gallerys = await this.EhGalleryRepository.findByIds([1, 2, 3, 4, 5, 6, 7]);
    return `
    <pre>${JSON.stringify(gallerys, null, 4)}</pre>
    `;
  }

  @Get('transfer')
  async import(): Promise<string> {
    let count = 0;
    let galleries = [];
    const take = 1000;
    let page = 0;
    // tslint:disable-next-line:no-conditional-assignment
    while (galleries = await this.EhGalleryRepository.find({skip: page * take, take}), galleries.length) {
      page++;
      count += galleries.length;
      for (const gallery of galleries) {

      }

      break;
    }


    return 'ok ' + count;
  }

}
