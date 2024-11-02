import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import STRINGS from 'src/common/consts/strings.json';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    console.log(req);

    return {
      message: STRINGS.RESPONSES.SUCCESS,
      data: req['user'],
    };
  }

  @Post('telegram/login')
  telegramLogin(@Body() dto: CreateAuthDto) {
    // return this.authService.create(dto);
    return null;
  }

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    const user = await this.authService.validateUser({
      username: dto.username,
      password: dto.password,
      client: 'web',
    });
    const data = await this.authService.login(user._id.toString());
    return {
      message: STRINGS.RESPONSES.SUCCESS,
      data,
    };
  }

  @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    const user = await this.usersService.create({
      username: dto.username,
      client: 'web',
      deviceId: dto.deviceId,
    });

    await this.authService.create({
      userId: user._id,
      password: dto.password,
      client: 'web',
    });

    return {
      message: STRINGS.RESPONSES.SUCCESS,
    };
  }
}
