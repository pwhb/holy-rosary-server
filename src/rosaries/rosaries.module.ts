import { Module } from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { RosariesController } from './rosaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rosary, RosarySchema } from './rosaries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rosary.name, schema: RosarySchema }]),
  ],
  controllers: [RosariesController],
  providers: [RosariesService],
})
export class RosariesModule {}
