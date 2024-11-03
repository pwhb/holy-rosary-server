import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rosary } from './rosaries.schema';
import { Model, Types } from 'mongoose';
import { CreatePrayerDto } from './dto/create-prayer-dto';
import { UpdatePrayerDto } from './dto/update-prayer-dto';

@Injectable()
export class RosariesService {
  constructor(
    @InjectModel(Rosary.name)
    private readonly rosaryModel: Model<Rosary>,
  ) {}

  async getTodayInfo(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    const found = await this.rosaryModel
      .findOne({
        userId: userId,
        date: today,
      })
      .lean();
    if (found) return found;

    const created = await this.rosaryModel.create({
      userId: userId,
      date: today,
    });
    return created;
  }

  createNewPrayer(dto: CreatePrayerDto, userId: string) {
    return this.rosaryModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(dto.rosaryId),
          userId: userId,
        },
        {
          $push: {
            prayers: {
              at: 0,
              count: dto.rosary_metadata.count,
              rosary_metadata: dto.rosary_metadata,
              prayer_metadata: dto.prayer_metadata,
              status: 'pending',
              startedAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
        { returnDocument: 'after' },
      )
      .lean();
  }

  async updatePrayer(dto: UpdatePrayerDto, userId: string) {
    const index = dto.currentIdx || 0;
    let updated = await this.rosaryModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(dto.rosaryId),
          userId: userId,
        },
        {
          $set: {
            [`prayers.${index}.updatedAt`]: new Date(),
          },
          $inc: {
            [`prayers.${index}.at`]: dto.diff,
          },
        },
        { returnDocument: 'after' },
      )
      .lean();
    if (updated?.prayers[index].at === updated?.prayers[index].count) {
      updated = await this.rosaryModel
        .findOneAndUpdate(
          {
            _id: new Types.ObjectId(dto.rosaryId),
            userId: userId,
          },
          {
            $set: {
              [`prayers.${index}.status`]: 'completed',
              [`prayers.${index}.completedAt`]: new Date(),
            },
          },
          { returnDocument: 'after' },
        )
        .lean();
    }
    return updated;
  }

  async resetPrayer(dto: UpdatePrayerDto, userId: string) {
    const index = dto.currentIdx || 0;
    let updated = await this.rosaryModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(dto.rosaryId),
          userId: userId,
        },
        {
          $set: {
            [`prayers.${index}.at`]: 0,
            [`prayers.${index}.status`]: 'pending',
            [`prayers.${index}.updatedAt`]: new Date(),
            [`prayers.${index}.completedAt`]: undefined,
          },
        },
        { returnDocument: 'after' },
      )
      .lean();
    return updated;
  }
}
