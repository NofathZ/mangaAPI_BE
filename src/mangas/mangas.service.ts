import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import { Repository } from 'typeorm';
import { MangasDTO } from './mangas.dto';
import { Manga } from './mangas.entity';

@Injectable()
export class MangasService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    private readonly httpService: HttpService
  ) { }

  async showAllMangas() {
    return this.mangaRepository.find()
  }

  async showMangaById(id) {
    const result = await this.mangaRepository.findOne({ _id: id })
    if (result) {
      return result
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
  }

  async createManga(title) {
    try {
      let cat = title.replace(/ /g, "%20")
      const manga = await this.httpService.get(`https://kitsu.io/api/edge/manga?filter[text]=${cat}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).pipe(map((res) => {
        let objectReturn = {
          _id: res.data.data[0].id,
          title: res.data.data[0].attributes.titles.en_jp,
          canonicalTitle: res.data.data[0].attributes.canonicalTitle,
          averageRating: res.data.data[0].attributes.averageRating,
          synopsis: res.data.data[0].attributes.synopsis
        }

        const data = new MangasDTO(objectReturn._id, objectReturn.title, objectReturn.canonicalTitle, objectReturn.averageRating, objectReturn.synopsis);
        this.mangaRepository.save(data).then(res => {
          return objectReturn
        })
      }))
      return manga
    }
    catch (error) {
      return new HttpException("Manga sudah ada", HttpStatus.BAD_REQUEST)
    }
  }

  async deleteManga(id) {
    try {
      await this.mangaRepository.delete({ _id: id })
      return {
        "_id": id
      }
    }
    catch (error) {
      throw new Error("ID tidak ditemukan")
    }
  }
}
