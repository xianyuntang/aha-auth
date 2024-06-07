import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { EnvField, Environment } from './app-config.constant';
import { AppConfigService } from './app-config.service';
import { AppEnvSchema } from './app-env.schema';

describe('AppConfigService', () => {
  let appConfigService: AppConfigService;

  const mockConfigService = {
    getOrThrow: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AppConfigService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    appConfigService = moduleRef.get<AppConfigService>(AppConfigService);
  });

  beforeEach(() => {
    mockConfigService.getOrThrow.mockImplementation((key: EnvField) => {
      const mockValues: AppEnvSchema = {
        [EnvField.NODE_ENV]: Environment.DEVELOPMENT,
        [EnvField.SERVER_PORT]: 3000,
        [EnvField.SERVER_PREFIX]: 'api',
        [EnvField.SERVER_EXTERNAL_URL]: 'http://localhost:3000',
        [EnvField.DB_HOST]: 'localhost',
        [EnvField.DB_PORT]: 5432,
        [EnvField.DB_NAME]: 'test_db',
        [EnvField.DB_USER]: 'test_user',
        [EnvField.DB_PASSWORD]: 'test_password',
        [EnvField.DB_DEBUG]: true,
        [EnvField.JWT_ACCESS_SECRET]: 'jwt-access-secret',
        [EnvField.JWT_REFRESH_SECRET]: 'jwt-refresh-secret',
      };
      return mockValues[key];
    });
  });

  describe('check object', () => {
    it('should return the correct server configuration', () => {
      const {
        env: { nodeEnv, isProduction },
      } = appConfigService;
      expect(nodeEnv).toBe(Environment.DEVELOPMENT);
      expect(isProduction).toBe(false);
    });

    it('should return the correct server configuration', () => {
      const {
        server: { prefix, port, externalUrl },
      } = appConfigService;
      expect(prefix).toBe('api');
      expect(port).toBe(3000);
      expect(externalUrl).toBe('http://localhost:3000');
    });

    it('should return the correct db configuration', () => {
      const {
        db: { host, port, dbName, user, password, debug },
      } = appConfigService;
      expect(host).toBe('localhost');
      expect(port).toBe(5432);
      expect(dbName).toBe('test_db');
      expect(user).toBe('test_user');
      expect(password).toBe('test_password');
      expect(debug).toBe(true);
    });

    it('should return the correct jwt configuration', () => {
      const {
        jwt: {
          accessSecret,
          refreshSecret,
          accessTokenExpiresIn,
          refreshTokenExpiresIn,
        },
      } = appConfigService;
      expect(accessSecret).toBe('jwt-access-secret');
      expect(refreshSecret).toBe('jwt-refresh-secret');
      expect(accessTokenExpiresIn).toBe('10m');
      expect(refreshTokenExpiresIn).toBe('7d');
    });
  });
});
