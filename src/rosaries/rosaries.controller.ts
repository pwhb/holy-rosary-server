import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { CreateRosaryDto } from './dto/create-rosary.dto';
import { UpdateRosaryDto } from './dto/update-rosary.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/auth/auth.guard';
@ApiBearerAuth()
@ApiTags('rosaries')
@Controller('api/v1/rosaries')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RosariesController {
  constructor(private readonly rosariesService: RosariesService) {}

  @Post()
  create(@Body() createRosaryDto: CreateRosaryDto) {
    return this.rosariesService.create(createRosaryDto);
  }

  @Get()
  findAll() {
    return this.rosariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rosariesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRosaryDto: UpdateRosaryDto) {
    return this.rosariesService.update(+id, updateRosaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rosariesService.remove(+id);
  }
}
