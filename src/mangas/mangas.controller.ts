import { Request, Controller, Get, UseGuards, Param, Post, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { MangasService } from './mangas.service';

@Controller()
export class MangasController {
  constructor(private readonly mangasService: MangasService, private readonly userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('mangas')
  getMangas(@Request() req): any {
    return this.mangasService.showAllMangas()
  }

  @UseGuards(JwtAuthGuard)
  @Get('mangas/:id')
  getMangaById(@Request() req, @Param() params): any {
    return this.mangasService.showMangaById(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('mangas')
  createManga(@Request() req, @Body('title') title: string,): any {
    return this.mangasService.createManga(title)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('mangas:/id')
  deleteManga(@Request() req, @Param() params): any {
    return this.mangasService.deleteManga(params.id)
  }
}
