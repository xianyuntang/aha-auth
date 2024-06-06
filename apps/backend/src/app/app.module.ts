import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '../app-config';
import { AuthModule } from '../auth';
import * as entities from '../db/entities';
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
