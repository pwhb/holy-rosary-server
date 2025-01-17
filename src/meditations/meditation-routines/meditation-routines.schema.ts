import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/schema/base.schema';
import { MeditationTemplate } from '../meditation-templates/meditation-templates.schema';
import { User } from 'src/users/users.schema';

export type MeditationRoutineDocument = HydratedDocument<MeditationRoutine>;

@Schema({ timestamps: true })
export class MeditationRoutine extends Base {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MeditationTemplate.name,
    required: true,
  })
  templateId: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  frequency: string;

  @Prop({ type: Number, required: true })
  count: number;
}

export const MeditationRoutineSchema =
  SchemaFactory.createForClass(MeditationRoutine);
