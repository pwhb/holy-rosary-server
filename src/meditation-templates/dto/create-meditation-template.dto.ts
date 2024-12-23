import { LanguageString } from 'src/common/schema/base.schema';
import {
  MeditationType,
  MeditationFrequency,
} from '../meditation-templates.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateMeditationTemplateDto {
  @ApiProperty()
  name: LanguageString;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  description: LanguageString;

  @ApiProperty()
  @IsString()
  type: MeditationType;

  @ApiProperty()
  @IsString()
  philosophy: string;

  @ApiProperty()
  @IsArray()
  frequencyOptions: MeditationFrequency[];

  @ApiProperty()
  @IsArray()
  countOptions: number[];

  @ApiProperty()
  metadata: any;
}
