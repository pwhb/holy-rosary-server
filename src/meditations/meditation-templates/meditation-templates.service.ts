import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MeditationTemplate } from './meditation-templates.schema';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { CreateMeditationTemplateDto } from './dto/create-meditation-template.dto';

@Injectable()
export class MeditationTemplatesService {
  constructor(
    @InjectModel(MeditationTemplate.name)
    private readonly meditationTemplateModel: Model<MeditationTemplate>,
  ) {}
  async findMany({
    filter,
    skip,
    limit,
    sort,
  }: {
    filter: FilterQuery<MeditationTemplate>;
    skip?: number;
    limit?: number;
    sort?: QueryOptions<MeditationTemplate>;
  }) {
    const docs = await this.meditationTemplateModel
      .find(filter, {}, { skip, limit, sort })
      .lean();
    const count = await this.meditationTemplateModel.countDocuments(filter);
    return {
      count,
      data: docs,
    };
  }
  async create(dto: CreateMeditationTemplateDto) {
    const created = await this.meditationTemplateModel.create(dto);
    return created;
  }
}
