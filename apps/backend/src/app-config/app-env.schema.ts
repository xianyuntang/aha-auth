import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

import { EnvField, Environment } from '../app-config';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsString()
  @IsOptional()
  [EnvField.SERVER_PREFIX]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.SERVER_PORT]!: number;

  @IsUrl({ require_protocol: true, require_tld: false })
  [EnvField.SERVER_EXTERNAL_URL]!: string;

  @IsString()
  [EnvField.DB_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.DB_PORT]!: number;

  @IsString()
  [EnvField.DB_NAME]!: string;

  @IsString()
  [EnvField.DB_USER]!: string;

  @IsString()
  [EnvField.DB_PASSWORD]!: string;

  @IsBoolean()
  @Transform(({ key, obj }) => {
    return obj[key] === 'true';
  })
  [EnvField.DB_DEBUG]!: boolean;

  @IsString()
  [EnvField.JWT_ACCESS_SECRET]!: string;

  @IsString()
  [EnvField.JWT_REFRESH_SECRET]!: string;

  @IsString()
  [EnvField.REDIS_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.REDIS_PORT]!: number;

  @IsUrl({ require_protocol: false })
  [EnvField.SMTP_HOST]!: string;

  @IsEnum([25, 587, 2587, 465, 2465])
  [EnvField.SMTP_PORT]!: number;

  @IsBoolean()
  [EnvField.SMTP_SECURE]!: boolean;

  @IsString()
  [EnvField.SMTP_USER]!: string;

  @IsString()
  [EnvField.SMTP_PASSWORD]!: string;

  @IsString()
  [EnvField.SMTP_SENDER]!: string;

  @IsString()
  [EnvField.OAUTH_GOOGLE_CLIENT_ID]!: string;

  @IsString()
  [EnvField.OAUTH_GOOGLE_CLIENT_SECRET]!: string;

  @IsString()
  [EnvField.OAUTH_GOOGLE_REDIRECT_URL]!: string;
}
