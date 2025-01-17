import { Module } from '@nestjs/common';
import { MeditationTemplatesService } from './meditation-templates.service';
import { MeditationTemplatesController } from './meditation-templates.controller';
import {
  MeditationTemplate,
  MeditationTemplateSchema,
} from './meditation-templates.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MeditationTemplate.name, schema: MeditationTemplateSchema },
    ]),
  ],
  controllers: [MeditationTemplatesController],
  providers: [MeditationTemplatesService],
})
export class MeditationTemplatesModule {}
