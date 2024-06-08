import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '../app-config';
import { AuthModule } from '../auth';
import * as entities from '../db/entities';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    MikroOrmModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        const {
          db: { host, port, dbName, user, password, debug },
        } = appConfigService;
        return {
          driver: PostgreSqlDriver,
          entities: [...Object.values(entities)],
          host,
          port,
          dbName,
          user,
          password,
          debug,
        };
      },
      inject: [AppConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        const {
          redis: { host, port },
        } = appConfigService;
        return { redis: { host, port } };
      },
      inject: [AppConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          transport: {
            host: appConfigService.smtp.host,
            port: appConfigService.smtp.port,
            secure: appConfigService.smtp.secure,
            auth: {
              user: appConfigService.smtp.user,
              pass: appConfigService.smtp.password,
            },
            requireTLS: true,
          },
          defaults: {
            from: appConfigService.smtp.sender,
          },
        };
      },
      inject: [AppConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
