import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard, RoleGuard } from 'src/auth/auth.guard';
import STRINGS from 'src/common/consts/strings.json';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RoleGuard)
  me(@Req() req: Request) {
    const me: any = { ...req['user'] };
    delete me.role;
    delete me.roleId;
    return {
      message: STRINGS.RESPONSES.SUCCESS,
      data: me,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
