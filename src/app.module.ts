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
import { RolesModule } from './core/roles/roles.module';
import { PermissionsModule } from './core/permissions/permissions.module';
import { MenusModule } from './core/menus/menus.module';
import { HomeController } from './home/home.controller';
import { MeditationTemplatesModule } from './meditations/meditation-templates/meditation-templates.module';
import { MeditationRoutinesModule } from './meditations/meditation-routines/meditation-routines.module';
import { MeditationRecordsService } from './meditations/meditation-records/meditation-records.service';
import { MeditationRecordsModule } from './meditations/meditation-records/meditation-records.module';
import { UtilsService } from './core/utils/utils.service';
import { EventsGateway } from './events/events/events.gateway';
import { EventsController } from './events/events/events.controller';

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
    RolesModule,
    PermissionsModule,
    MenusModule,
    MeditationTemplatesModule,
    MeditationRoutinesModule,
    MeditationRecordsModule,
  ],
  controllers: [AppController, HomeController, EventsController],
  providers: [
    AppService,
    CacheService,
    BotService,
    TemplatesService,
    TokensService,
    MeditationRecordsService,
    UtilsService,
    EventsGateway,
  ],
})
export class AppModule {}
