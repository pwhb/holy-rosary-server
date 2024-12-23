import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CreatePrayerDto } from './dto/create-prayer-dto';
import STRINGS from 'src/common/consts/strings.json';
import { UpdatePrayerDto } from './dto/update-prayer-dto';
@ApiBearerAuth()
@ApiTags('rosaries')
@Controller('api/v1/rosaries')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RosariesController {
  constructor(private readonly rosariesService: RosariesService) {}
}
