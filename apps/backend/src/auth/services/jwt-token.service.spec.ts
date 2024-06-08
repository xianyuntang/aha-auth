import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import dayjs from 'dayjs';

import { AppConfigService } from '../../app-config';
import { User, UserProfile } from '../../orm';
import { JwtTokenService } from './jwt-token.service';

const mockedUser: User = {
  oauthUsers: [] as any,
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
  email: 'john@example.com',
  profile: { firstName: 'John', lastName: 'Doe' } as UserProfile,
  id: '1',
  signInHistories: [] as any,
};

const mockedAppConfigService = {
  jwt: {
    accessSecret: 'accessSecret',
    refreshSecret: 'refreshSecret',
    accessTokenExpiresIn: '1d',
    refreshTokenExpiresIn: '7d',
  },
} as AppConfigService;

describe('jwtTokenService', () => {
  let jwtTokenService: JwtTokenService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        JwtTokenService,
        { provide: AppConfigService, useValue: mockedAppConfigService },
      ],
    }).compile();

    jwtTokenService = moduleRef.get<JwtTokenService>(JwtTokenService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('issueAccessToken', () => {
    it('should return valid jwt token', async () => {
      const sign = jest.spyOn(jwtService, 'sign');
      const jwtToken = jwtTokenService.issueAccessToken(mockedUser);
      expect(jwtToken).toBeDefined();
      expect(sign).toHaveBeenCalled();
    });
  });

  describe('issueRefreshToken', () => {
    it('should return valid jwt token', async () => {
      const sign = jest.spyOn(jwtService, 'sign');

      const jwtToken = jwtTokenService.issueRefreshToken(mockedUser);
      expect(jwtToken).toBeDefined();
      expect(sign).toHaveBeenCalled();
    });
  });
});
