import * as process from 'node:process';

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateObject } from 'common';
import path from 'path';

import { PROJECT_ROOT } from '../app';
import { Environment } from './app-config.constant';
import { AppConfigService } from './app-config.service';
import { AppEnvSchema } from './app-env.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        path.resolve(PROJECT_ROOT, `.env.${process.env.NODE_ENV}.local`),
        path.resolve(PROJECT_ROOT, `.env.${process.env.NODE_ENV}`),
      ],
      ignoreEnvVars: process.env['NODE_ENV'] === Environment.DEVELOPMENT,
      validate: (config) => {
        const [schema, errors] = validateObject(AppEnvSchema, config);
        if (errors.length > 0) {
          throw Error(errors.toString());
        }
        return schema;
      },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
