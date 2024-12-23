import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { MeditationTemplatesService } from './meditation-templates.service';
import { CreateMeditationTemplateDto } from './dto/create-meditation-template.dto';
import { UpdateMeditationTemplateDto } from './dto/update-meditation-template.dto';
import { Response } from 'express';

@Controller('meditation-templates')
export class MeditationTemplatesController {
  constructor(
    private readonly meditationTemplatesService: MeditationTemplatesService,
  ) {}

  @Post()
  async create(@Body() dto: CreateMeditationTemplateDto, @Res() res: Response) {
    const data = await this.meditationTemplatesService.create({
      ...dto,
    });
    return res.status(200).json({
      ok: true,
      data,
    });
  }
}
