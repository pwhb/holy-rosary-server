import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/auth/auth.guard';
import { RosariesService } from 'src/rosaries/rosaries.service';
import STRINGS from 'src/common/consts/strings.json';
import { CreatePrayerDto } from 'src/rosaries/dto/create-prayer-dto';
import { UpdatePrayerDto } from 'src/rosaries/dto/update-prayer-dto';
@ApiBearerAuth()
@ApiTags('home')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/v1/home')
export class HomeController {
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
