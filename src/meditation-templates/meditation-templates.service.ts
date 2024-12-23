import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeditationTemplate } from './meditation-templates.schema';
import { Model } from 'mongoose';
import { CreateMeditationTemplateDto } from './dto/create-meditation-template.dto';

@Injectable()
export class MeditationTemplatesService {
  constructor(
    @InjectModel(MeditationTemplate.name)
    private readonly meditationTemplateModel: Model<MeditationTemplate>,
  ) {}

  async create(dto: CreateMeditationTemplateDto) {
    const created = await this.meditationTemplateModel.create(dto);
    return created;
  }
}
