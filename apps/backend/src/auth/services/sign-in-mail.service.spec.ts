import { Test } from '@nestjs/testing';
import dayjs from 'dayjs';

import { AppConfigService } from '../../app-config';
import { MailerService } from '../../mailer';
import { User, UserProfile } from '../../orm';
import { JwtTokenService } from './jwt-token.service';
import { SignInMailService } from './sign-in-mail.service';

const mockAppConfigService = {
  env: {
    isProduction: false,
  },
};

const mockJwtTokenService = {
  getSignInLink: jest.fn(),
};

const mockMailerService = {
  sendMail: jest.fn(),
};

const mockUser: User = {
  oauthUsers: [] as never,
  signInHistories: [] as never,
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
  email: 'john@example.com',
  profile: { firstName: 'John', lastName: 'Doe' } as UserProfile,
  id: '1',
};
describe('SignInMailService', () => {
  let signInMailService: SignInMailService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignInMailService,
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    signInMailService = moduleRef.get<SignInMailService>(SignInMailService);
  });

  describe('sendSignInMail', () => {
    it('getSignInLink should be called once', () => {
      signInMailService.sendSignInMail(mockUser);
      expect(mockJwtTokenService.getSignInLink).toHaveBeenCalled();
    });
  });
});
