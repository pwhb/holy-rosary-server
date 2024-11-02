import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { CreateRosaryDto } from './dto/create-rosary.dto';
import { UpdateRosaryDto } from './dto/update-rosary.dto';

@Controller('rosaries')
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
