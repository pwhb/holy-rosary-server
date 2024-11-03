import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Base } from 'src/common/schema/base.schema';
import { User } from 'src/users/users.schema';

export type RosaryDocument = HydratedDocument<Rosary>;

export type TPrayer = {
  at: number;
  count: number;
  rosary_metadata: any;
  prayer_metadata: any;
  status: string;
  startedAt: Date;
  updatedAt: Date;
  completedAt: Date;
};

@Schema({ timestamps: true })
export class Rosary extends Base {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({})
  prayers: TPrayer[];
}

export const RosarySchema = SchemaFactory.createForClass(Rosary);
