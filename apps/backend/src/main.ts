import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfigService = app.get<AppConfigService>(AppConfigService);

  const {
    server: { prefix, port },
  } = appConfigService;

  app.setGlobalPrefix(prefix);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://0.0.0.0:${port}/${prefix}`);
}

void bootstrap();
