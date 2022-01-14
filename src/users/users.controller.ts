import { Controller, Get, UseGuards, Request, Post, Body, Param } from "@nestjs/common"
import { AuthService } from "src/auth/auth.service"
import { LocalAuthGuard } from "src/auth/local-auth.guard"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { UsersService } from "./users.service"

@Controller()
export class UserController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user)
  }

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string 
  ): any {
    const hasil = this.usersService.insert(email, password)
    return hasil
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  userData(@Request() req): any {
    return req.user
  }

  @Get('user/:email')
  userInfo(@Param() params) : any {
    return this.usersService.findOne(params.email)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user
  }
}