import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meditation } from './meditations.schema';

@Injectable()
export class MeditationsService {
  constructor(
    @InjectModel(Meditation.name)
    private readonly meditationModel: Model<Meditation>,
  ) {}
  async create(dto: any, userId: string) {
    const today = new Date().toISOString().split('T')[0];
    const created = await this.meditationModel.create({
      userId: userId,
      date: today,
      createdBy: userId,
      prayer_metadata: dto.prayer_metadata,
      rosary_metadata: dto.rosary_metadata,
      count: dto.rosary_metadata.count,
      at: 0,
    });
    return created;
  }
}
