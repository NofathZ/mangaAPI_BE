import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    let isMatch = false
    isMatch = user ? await bcrypt.compare(password, user.password) : false
    if (user && isMatch) {
      const { password, ...rest } = user
      return rest
    }
    return null
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email }

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
