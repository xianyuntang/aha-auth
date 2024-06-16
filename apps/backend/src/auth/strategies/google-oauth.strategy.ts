import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AppConfigService } from '../../app-config';

export const GOOGLE_OAUTH_STRATEGY = 'GoogleOauthStrategy';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_OAUTH_STRATEGY
) {
  constructor(readonly appConfigService: AppConfigService) {
    const {
      oauth: {
        google: { clientId, clientSecret, redirectUrl },
      },
    } = appConfigService;
    super({
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string | undefined,
    profile: Profile,
    done: VerifyCallback
  ) {
    return done(null, profile);
  }
}
