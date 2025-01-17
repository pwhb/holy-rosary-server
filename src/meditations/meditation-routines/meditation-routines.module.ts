import { Module } from '@nestjs/common';
import { MeditationRoutinesService } from './meditation-routines.service';
import {
  MeditationRoutine,
  MeditationRoutineSchema,
} from './meditation-routines.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeditationRoutine.name, schema: MeditationRoutineSchema },
    ]),
  ],
  providers: [MeditationRoutinesService],
})
export class MeditationRoutinesModule {}
