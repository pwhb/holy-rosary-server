import { PartialType } from '@nestjs/swagger';
import { CreateMeditationDto } from './create-meditation.dto';

export class UpdateMeditationDto extends PartialType(CreateMeditationDto) {}
