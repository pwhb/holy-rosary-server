import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePrayerDto {
  @ApiProperty()
  @IsString()
  rosaryId: string;

  @ApiProperty()
  @IsNumber()
  diff: number;

  @ApiProperty()
  @IsOptional()
  currentIdx?: number;
}
