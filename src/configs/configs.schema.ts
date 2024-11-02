import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from 'src/common/schema/base.schema';

export enum ConfigType {
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  OBJECT = 'OBJECT',
  NUMBER = 'NUMBER',
}

export type TConfig = {
  code: string;
  name: string;
  value: any;
  type: ConfigType;
};

export type ConfigDocument = HydratedDocument<Config>;
@Schema({ timestamps: true })
export class Config extends Base {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'STRING' })
  type: ConfigType;

  @Prop({ type: {}, default: '' })
  value: any;

  @Prop({ type: Array, default: [] })
  subConfigs: TConfig[];
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
