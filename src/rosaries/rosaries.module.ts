import { Module } from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { RosariesController } from './rosaries.controller';

@Module({
  controllers: [RosariesController],
  providers: [RosariesService],
})
export class RosariesModule {}
