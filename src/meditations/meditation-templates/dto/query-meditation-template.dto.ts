import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMeditationTemplateDto } from './create-meditation-template.dto';

export class QueryMeditationTemplateDto extends PartialType(
  PickType(CreateMeditationTemplateDto, ['type', 'philosophy'] as const),
) {
  @ApiProperty()
  @IsOptional()
  q?: string;

  @ApiProperty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  size?: number;

  @ApiProperty()
  @IsOptional()
  sort_by?: string;
}
