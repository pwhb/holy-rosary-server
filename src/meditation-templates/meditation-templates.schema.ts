import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base, LanguageString } from 'src/common/schema/base.schema';

export type MeditationTemplateDocument = HydratedDocument<MeditationTemplate>;

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
export class MeditationTemplate extends Base {
  @Prop({ required: true })
  name: LanguageString;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  description: LanguageString;

  @Prop({ type: String })
  type: MeditationType;

  @Prop({ type: String })
  philosophy: string;

  @Prop({ type: [String] })
  frequencyOptions: MeditationFrequency[];

  @Prop()
  countOptions: number[];

  @Prop({ type: Object })
  metadata: any;
}

export const MeditationTemplateSchema =
  SchemaFactory.createForClass(MeditationTemplate);
