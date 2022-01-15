import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { User } from "./users/users.entity";
import { UsersService } from "./users/users.service";
import { UserController } from "./users/users.controller";
import { MangasController } from './mangas/mangas.controller';
import { MangasService } from './mangas/mangas.service';
import { MangasModule } from './mangas/mangas.module';
import { Manga } from "./mangas/mangas.entity";
import { HttpModule, HttpService } from "@nestjs/axios";

@Module({
  controllers: [AppController, UserController, MangasController],
  providers: [AppService, UsersService, MangasService],
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: null,
    database: 'mangaapi',
    entities: [User, Manga],
    synchronize: true,
    autoLoadEntities: true
  }), TypeOrmModule.forFeature([User, Manga]), MangasModule, HttpModule]
})
export class AppModule {
  constructor(private connection: Connection) { }
}