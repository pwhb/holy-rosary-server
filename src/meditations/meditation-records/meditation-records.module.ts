import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MeditationRoutine,
  MeditationRoutineSchema,
} from '../meditation-routines/meditation-routines.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeditationRoutine.name, schema: MeditationRoutineSchema },
    ]),
  ],
})
export class MeditationRecordsModule {}
