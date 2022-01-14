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

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: null,
    database: 'mangaapi',
    entities: [User],
    synchronize: true,
    autoLoadEntities: true
  }), TypeOrmModule.forFeature([User])]
})
export class AppModule {
  constructor(private connection: Connection) { }
}