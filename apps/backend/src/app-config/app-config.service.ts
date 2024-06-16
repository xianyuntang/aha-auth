import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvField, Environment } from './app-config.constant';

@Injectable()
export class AppConfigService {
  constructor(protected readonly configService: ConfigService) {}

  get env() {
    return {
      nodeEnv: this.configService.getOrThrow<Environment>(EnvField.NODE_ENV),
      isProduction:
        this.configService.getOrThrow<Environment>(EnvField.NODE_ENV) ===
        Environment.PRODUCTION,
    };
  }

  get server() {
    return {
      prefix: this.configService.getOrThrow<string>(EnvField.SERVER_PREFIX),
      port: this.configService.getOrThrow<number>(EnvField.SERVER_PORT),
      externalUrl: this.configService.getOrThrow<string>(
        EnvField.SERVER_EXTERNAL_URL
      ),
    };
  }

  get redis() {
    return {
      host: this.configService.getOrThrow<string>(EnvField.REDIS_HOST),
      port: this.configService.getOrThrow<number>(EnvField.REDIS_PORT),
    };
  }

  get db() {
    return {
      host: this.configService.getOrThrow<string>(EnvField.DB_HOST),
      port: this.configService.getOrThrow<number>(EnvField.DB_PORT),
      dbName: this.configService.getOrThrow<string>(EnvField.DB_NAME),
      user: this.configService.getOrThrow<string>(EnvField.DB_USER),
      password: this.configService.getOrThrow<string>(EnvField.DB_PASSWORD),
      debug: this.configService.getOrThrow<boolean>(EnvField.DB_DEBUG),
    };
  }

  get jwt() {
    return {
      accessSecret: this.configService.getOrThrow<string>(
        EnvField.JWT_ACCESS_SECRET
      ),
      refreshSecret: this.configService.getOrThrow<string>(
        EnvField.JWT_REFRESH_SECRET
      ),
      accessTokenExpiresIn: '10m',
      refreshTokenExpiresIn: '7d',
    };
  }

  get smtp() {
    return {
      host: this.configService.getOrThrow<string>(EnvField.SMTP_HOST),
      port: this.configService.getOrThrow<number>(EnvField.SMTP_PORT),
      secure: this.configService.getOrThrow(<string>EnvField.SMTP_SECURE),
      user: this.configService.getOrThrow<string>(EnvField.SMTP_USER),
      password: this.configService.getOrThrow<string>(EnvField.SMTP_PASSWORD),
      sender: this.configService.getOrThrow<string>(EnvField.SMTP_SENDER),
    };
  }

  get oauth() {
    return {
      google: {
        clientId: this.configService.getOrThrow<string>(
          EnvField.OAUTH_GOOGLE_CLIENT_ID
        ),
        clientSecret: this.configService.getOrThrow<string>(
          EnvField.OAUTH_GOOGLE_CLIENT_SECRET
        ),
        redirectUrl: this.configService.getOrThrow<string>(
          EnvField.OAUTH_GOOGLE_REDIRECT_URL
        ),
      },
    };
  }
}
