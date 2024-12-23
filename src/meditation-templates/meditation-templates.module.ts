import { Module } from '@nestjs/common';
import { MeditationTemplatesService } from './meditation-templates.service';
import { MeditationTemplatesController } from './meditation-templates.controller';

@Module({
  controllers: [MeditationTemplatesController],
  providers: [MeditationTemplatesService],
})
export class MeditationTemplatesModule {}
