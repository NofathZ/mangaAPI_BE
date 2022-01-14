import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDTO } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [UsersDTO, ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersDTO],
  exports: [UsersService]
})
export class UsersModule { }
