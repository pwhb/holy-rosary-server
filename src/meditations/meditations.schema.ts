import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/schema/base.schema';
import { User } from 'src/users/users.schema';

export type MeditationDocument = HydratedDocument<Meditation>;

export enum MeditationType {
  Rosary = 'rosary',
  Chanting = 'chanting',
}

export enum MeditationFrequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}
@Schema({ timestamps: true })
export class Meditation extends Base {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ type: Number, default: 0 })
  at: number;

  @Prop({ type: Number })
  count: number;

  @Prop({ type: String })
  type: MeditationType;

  @Prop({ type: String })
  frequency: MeditationFrequency;

  @Prop({ type: Object })
  metadata: any;

  @Prop({ type: String, default: 'PENDING' })
  status: string;

  @Prop({ type: Date })
  completedAt: Date;
}

export const MeditationSchema = SchemaFactory.createForClass(Meditation);
