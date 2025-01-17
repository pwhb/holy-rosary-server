import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MeditationTemplatesService } from './meditation-templates.service';
import { CreateMeditationTemplateDto } from './dto/create-meditation-template.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public, RoleGuard } from 'src/auth/auth.guard';
import { QueryMeditationTemplateDto } from './dto/query-meditation-template.dto';
import { parseQuery, QueryType } from 'src/common/db/query';

@ApiBearerAuth()
@ApiTags('meditation-templates')
@Controller('api/v1/meditation-templates')
@UseGuards(JwtAuthGuard, RoleGuard)
export class MeditationTemplatesController {
  constructor(
    private readonly meditationTemplatesService: MeditationTemplatesService,
  ) {}
  @Get()
  @Public()
  async findMany(
    @Query() query: QueryMeditationTemplateDto,
    @Res() res: Response,
  ) {
    const { skip, limit, page, sort, filter } = parseQuery(query, [
      {
        key: 'q',
        type: QueryType.Regex,
        searchedFields: ['name.en', 'name.my'],
      },
      {
        key: 'philosophy',
        type: QueryType.String,
        searchedFields: ['philosophy'],
      },
      {
        key: 'type',
        type: QueryType.String,
        searchedFields: ['type'],
      },
    ]);
    const { count, data } = await this.meditationTemplatesService.findMany({
      filter,
      skip,
      limit,
      sort,
    });
    return res.status(200).json({
      ok: true,
      page,
      size: limit,
      count,
      data,
    });
  }

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
