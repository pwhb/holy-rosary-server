import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RosariesService } from './rosaries.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CreatePrayerDto } from './dto/create-prayer-dto';
import STRINGS from 'src/common/consts/strings.json';
import { UpdatePrayerDto } from './dto/update-prayer-dto';
@ApiBearerAuth()
@ApiTags('rosaries')
@Controller('api/v1/rosaries')
@UseGuards(JwtAuthGuard, RoleGuard)
export class RosariesController {
  constructor(private readonly rosariesService: RosariesService) {}

  @Post('today')
  async getTodayInfo(@Req() req: Request & { user: any }) {
    const data = await this.rosariesService.getTodayInfo(req['user']['_id']!);
    return {
      ok: true,
      data,
    };
  }

  @Post('new-prayer')
  async createNewPrayer(
    @Req() req: Request & { user: any },
    @Body() dto: CreatePrayerDto,
  ) {
    const data = await this.rosariesService.createNewPrayer(
      dto,
      req['user']['_id']!,
    );
    if (!data) throw Error(STRINGS.RESPONSES.NOT_FOUND);
    return {
      ok: true,
      data,
    };
  }

  @Post('update-prayer')
  async updatePrayer(
    @Req() req: Request & { user: any },
    @Body() dto: UpdatePrayerDto,
  ) {
    const data = await this.rosariesService.updatePrayer(
      dto,
      req['user']['_id']!,
    );
    if (!data) throw Error(STRINGS.RESPONSES.NOT_FOUND);
    return {
      ok: true,
      data,
    };
  }

  @Post('reset-prayer')
  async resetPrayer(
    @Req() req: Request & { user: any },
    @Body() dto: UpdatePrayerDto,
  ) {
    const data = await this.rosariesService.updatePrayer(
      dto,
      req['user']['_id']!,
    );
    if (!data) throw Error(STRINGS.RESPONSES.NOT_FOUND);
    return {
      ok: true,
      data,
    };
  }
}
