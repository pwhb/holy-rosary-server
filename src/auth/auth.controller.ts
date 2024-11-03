import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import STRINGS from 'src/common/consts/strings.json';
import { Request } from 'express';
import { BasicAuthGuard } from './auth.guard';
import { ConfigsService } from 'src/configs/configs.service';
import { VisibilityType } from 'src/configs/configs.schema';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
@ApiBasicAuth()
@ApiTags('auth')
@UseGuards(BasicAuthGuard)
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configsService: ConfigsService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginAuthDto, @Req() req: Request) {
    const user = await this.authService.validateUser({
      username: dto.username,
      password: dto.password,
      client: req['user'] as string,
    });
    const data = await this.authService.login(user._id.toString());
    return {
      ok: true,
      data,
    };
  }

  @Post('register')
  async register(@Body() dto: RegisterAuthDto, @Req() req: Request) {
    const ROLE_CONFIG = await this.configsService.get(
      'ROLE_CONFIG',
      VisibilityType.PRIVATE,
    );

    const user = await this.usersService.create({
      username: dto.username,
      client: req['user'] as string,
      deviceId: dto.deviceId,
      roleId: ROLE_CONFIG.value['PUBLIC'],
    });

    await this.authService.create({
      userId: user._id,
      password: dto.password,
      client: req['user'] as string,
    });

    return {
      ok: true,
    };
  }
}
