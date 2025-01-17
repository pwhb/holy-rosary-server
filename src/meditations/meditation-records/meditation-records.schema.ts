import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/schema/base.schema';
import { User } from 'src/users/users.schema';
import { MeditationTemplate } from '../meditation-templates/meditation-templates.schema';

export type MeditationRecordDocument = HydratedDocument<MeditationRecord>;

export enum MeditationStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

@Schema({ timestamps: true })
export class MeditationRecord extends Base {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MeditationTemplate.name,
    required: true,
  })
  templateId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ type: String, default: MeditationStatus.PENDING })
  status: MeditationStatus;

  @Prop({ type: Number, default: 0 })
  at: number;

  @Prop({ type: Number })
  count: number;
}

export const MeditationRecordSchema =
  SchemaFactory.createForClass(MeditationRecord);
