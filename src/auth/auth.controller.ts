import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
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

  async registerUser(dto: RegisterAuthDto & { client: string }) {
    const ROLE_CONFIG = await this.configsService.get(
      'ROLE_CONFIG',
      VisibilityType.PRIVATE,
    );
    const user = await this.usersService.create({
      username: dto.username,
      client: dto.client,
      deviceId: dto.deviceId,
      roleId: ROLE_CONFIG.value.DEFAULT,
    });

    await this.authService.create({
      userId: user._id,
      password: dto.password,
      client: dto.client,
    });
    return user;
  }

  @Post('/thirdparty/login')
  async thirdpartyLogin(@Body() dto: LoginAuthDto, @Req() req: Request) {
    const username = `${req['user']}:${dto.username}`;
    let userId: string;
    const alreadyExists = await this.usersService.findOneByFilter({
      username: username,
      client: req['user'] as string,
    });
    if (!alreadyExists) {
      const user = await this.registerUser({
        username: username,
        password: dto.password,
        deviceId: dto.deviceId,
        client: req['user'] as string,
      });
      userId = user._id.toString();
    } else {
      const user = await this.authService.validateUser({
        username: username,
        password: dto.password,
        client: req['user'] as string,
      });
      userId = user._id.toString();
    }
    const data = await this.authService.login(userId);
    return {
      ok: true,
      data,
    };
  }

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
    await this.registerUser({
      username: dto.username,
      password: dto.password,
      deviceId: dto.deviceId,
      client: req['user'] as string,
    });
    return {
      ok: true,
    };
  }
}
