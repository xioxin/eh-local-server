import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entity/gallery';
import { GalleryOriginal } from './entity/gallery-original';
import { Tag } from './entity/tag';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      synchronize: false,
      logging: false,
      autoSave: false,
      location: './database/eh_api_db.sqlite',
      entities: [GalleryOriginal],
      name: 'eh_api_db',
    }),
    TypeOrmModule.forRoot({
      type: 'sqljs',
      synchronize: true,
      logging: false,
      autoSave: false,
      location: './database/my.sqlite',
      entities: [Gallery, Tag],
    }),

    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   synchronize: false,
    //   logging: false,
    //   database: './database/eh_api_db.sqlite',
    //   entities: [GalleryOriginal],
    //   name: 'eh_api_db',
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   synchronize: true,
    //   logging: false,
    //   database: './database/my.sqlite',
    //   entities: [Gallery, Tag],
    // }),

    TypeOrmModule.forFeature([GalleryOriginal], 'eh_api_db'),
    TypeOrmModule.forFeature([Gallery, Tag]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
