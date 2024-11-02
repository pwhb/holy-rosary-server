import { PartialType } from '@nestjs/mapped-types';
import { CreateRosaryDto } from './create-rosary.dto';

export class UpdateRosaryDto extends PartialType(CreateRosaryDto) {}
