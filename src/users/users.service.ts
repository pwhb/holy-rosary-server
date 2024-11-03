import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.schema';
import { CacheService } from 'src/core/cache/cache.service';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import STRINGS from 'src/common/consts/strings.json';
import { permission } from 'process';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cacheService: CacheService,
  ) {}
  async create(dto: User) {
    const alreadyExists = await this.userModel.countDocuments({
      username: dto.username,
      client: dto.client,
    });
    if (alreadyExists) throw Error(STRINGS.RESPONSES.USER_ALREADY_EXISTS);
    const data = await this.userModel.create(dto);
    return data;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneById(id: string) {
    return this.cacheService.get(`USERS:${id}`, () =>
      this.userModel
        .findById(id)
        .populate('role', {
          _id: 0,
          name: 1,
        })
        .select({
          deviceId: 0,
          updatedAt: 0,
        })
        .lean(),
    );
  }

  findOneByIdForAuth(id: string) {
    return this.cacheService.get(`USERS:${id}`, () =>
      this.userModel
        .findById(id)
        .populate('role', {
          _id: 0,
          name: 1,
          permissionIds: 1,
        })
        .select({
          deviceId: 0,
          updatedAt: 0,
        })
        .lean(),
    );
  }

  findOneByFilter(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter).lean();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
