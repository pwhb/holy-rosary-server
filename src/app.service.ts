import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService
{
  constructor(private configService: ConfigService) { }
  getHello(): object
  {
    const env = this.configService.get("NODE_ENV")
      ? `${this.configService.get("NODE_ENV")}`
      : 'unknown';
    return {
      name: `diogenes backend`,
      env,
      version: this.configService.get("VERSION"),
    };
  }
}
