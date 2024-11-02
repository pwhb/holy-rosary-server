import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { TelegrafModule } from 'nestjs-telegraf';
import { AuthModule } from './auth/auth.module';
import { RosariesModule } from './rosaries/rosaries.module';
import { UsersModule } from './users/users.module';
import { ConfigsModule } from './configs/configs.module';
import { CacheService } from './core/cache/cache.service';
import { session } from 'telegraf';
import { BotService } from './telegram/bot/bot.service';
import { TemplatesService } from './core/templates/templates.service';
import { TokensService } from './auth/tokens/tokens.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { WebhooksController } from './webhooks/webhooks.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN')!,
        launchOptions: {
          webhook: {
            domain: configService.get('TELEGRAM_WEBHOOK_DOMAIN')!,
            path: configService.get('TELEGRAM_WEBHOOK_PATH')!,
          },
        },
        middlewares: [session()],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RosariesModule,
    UsersModule,
    ConfigsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CacheService,
    BotService,
    TemplatesService,
    TokensService,
  ],
})
export class AppModule {}
