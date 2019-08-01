import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entity/gallery';
import { GalleryOriginal } from './entity/gallery-original';
import { Tag } from './entity/tag';
import { GraphQLModule } from '@nestjs/graphql';
import { QueryRunner } from 'typeorm';

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
    // TypeOrmModule.forRoot({
    //   type: 'sqljs',
    //   synchronize: true,
    //   logging: false,
    //   autoSave: false,
    //   location: './database/my.sqlite',
    //   entities: [Gallery, Tag],
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      entities: [Gallery, Tag],
      logger: 'advanced-console',
      logging: true,

      // logger: {
      //   logQuery: (a, b) => console.log(a, b),
      //   logQueryError: (a, b) => console.log(a, b),
      //   logQuerySlow: (a, b) => console.log(a, b),
      //   logSchemaBuild: (a, b) => console.log(a, b),
      //   logMigration: (a, b) => console.log(a, b),
      //   log: (a, b) => console.log(a, b),
      // },
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

    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   autoSchemaFile: 'schema.gql',
    // }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
