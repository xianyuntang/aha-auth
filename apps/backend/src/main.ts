import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfigService = app.get<AppConfigService>(AppConfigService);

  const {
    env: { isProduction },
    server: { prefix, port, externalUrl },
  } = appConfigService;

  app.setGlobalPrefix(prefix);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      enableDebugMessages: !isProduction,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );

  app.enableCors({ origin: externalUrl, exposedHeaders: ['Location'] });

  app.use(helmet());

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://0.0.0.0:${port}/${prefix}`);
}

void bootstrap();
