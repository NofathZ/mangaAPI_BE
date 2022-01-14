import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UsersDTO } from './users.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async findOne(email: string): Promise<UsersDTO | undefined> {
    return this.userRepository.findOne({ email })
  }

  async insert(email: string, password: string) {
    try {
      const user = await this.findOne(email)

      if (!user) {
        const saltOrRounds = parseInt(process.env.SALTORROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const data = new UsersDTO(email, hashedPassword)
        await this.userRepository.save(data)

        const added = await this.findOne(email)
        return added
      }
      throw new Error("User udah ada");
    }
    catch (err) {
      return { msg: err.message }
    }
  }

  
}
