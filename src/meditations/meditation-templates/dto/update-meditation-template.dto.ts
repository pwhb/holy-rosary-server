import { PartialType } from '@nestjs/swagger';
import { CreateMeditationTemplateDto } from './create-meditation-template.dto';

export class UpdateMeditationTemplateDto extends PartialType(
  CreateMeditationTemplateDto,
) {}
