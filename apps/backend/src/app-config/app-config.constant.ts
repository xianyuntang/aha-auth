export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum EnvField {
  NODE_ENV = 'NODE_ENV',
  SERVER_PREFIX = 'SERVER_PREFIX',
  SERVER_PORT = 'SERVER_PORT',
  SERVER_EXTERNAL_URL = 'SERVER_EXTERNAL_URL',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_NAME = 'DB_NAME',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DEBUG = 'DB_DEBUG',
  JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET',
  JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  SMTP_HOST = 'SMTP_HOST',
  SMTP_PORT = 'SMTP_PORT',
  SMTP_SECURE = 'SMTP_SECURE',
  SMTP_USER = 'SMTP_USER',
  SMTP_PASSWORD = 'SMTP_PASSWORD',
  SMTP_SENDER = 'SMTP_SENDER',
  OAUTH_GOOGLE_CLIENT_ID = 'OAUTH_GOOGLE_CLIENT_ID',
  OAUTH_GOOGLE_CLIENT_SECRET = 'OAUTH_GOOGLE_CLIENT_SECRET',
}
