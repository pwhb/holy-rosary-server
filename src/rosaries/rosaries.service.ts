import { Injectable } from '@nestjs/common';
import { CreateRosaryDto } from './dto/create-rosary.dto';
import { UpdateRosaryDto } from './dto/update-rosary.dto';

@Injectable()
export class RosariesService {
  create(createRosaryDto: CreateRosaryDto) {
    return 'This action adds a new rosary';
  }

  findAll() {
    return `This action returns all rosaries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rosary`;
  }

  update(id: number, updateRosaryDto: UpdateRosaryDto) {
    return `This action updates a #${id} rosary`;
  }

  remove(id: number) {
    return `This action removes a #${id} rosary`;
  }
}
