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
import { MeditationsService } from './meditations/meditations.service';
import { MeditationTemplatesModule } from './meditation-templates/meditation-templates.module';

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
  ],
  controllers: [AppController, HomeController],
  providers: [
    AppService,
    CacheService,
    BotService,
    TemplatesService,
    TokensService,
    MeditationsService,
  ],
})
export class AppModule {}
