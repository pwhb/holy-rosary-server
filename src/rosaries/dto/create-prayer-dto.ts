import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePrayerDto {
  @ApiProperty()
  @IsString()
  rosaryId: string;

  @ApiProperty()
  @IsObject()
  rosary_metadata: {
    code: string;
    count: number;
  };

  @ApiProperty()
  @IsOptional()
  prayer_metadata: {
    code: string;
  };
}
