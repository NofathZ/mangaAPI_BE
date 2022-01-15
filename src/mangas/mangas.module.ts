import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangasDTO } from './mangas.dto';
import { Manga } from './mangas.entity';
import { MangasService } from './mangas.service';

@Module({
  imports: [HttpModule, MangasDTO,  TypeOrmModule.forFeature([Manga])],
  providers: [MangasService],
  exports: []
})
export class MangasModule { }
