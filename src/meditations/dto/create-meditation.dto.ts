import { ApiProperty } from '@nestjs/swagger';
import { MeditationType } from '../meditations.schema';

export class CreateMeditationDto {
  @ApiProperty()
  type: MeditationType;

  @ApiProperty()
  metadata: any;
}
