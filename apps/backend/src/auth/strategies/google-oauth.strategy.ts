import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import urljoin from 'url-join';

import { AppConfigService } from '../../app-config';

export const GOOGLE_OAUTH_STRATEGY = 'GoogleOauthStrategy';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_OAUTH_STRATEGY
) {
  constructor(readonly appConfigService: AppConfigService) {
    const {
      server: { externalUrl, prefix },
      oauth: {
        google: { clientId, clientSecret },
      },
    } = appConfigService;
    super({
      clientID: clientId,
      clientSecret,
      callbackURL: urljoin(
        externalUrl,
        prefix,
        'auth',
        'sign-in',
        'google',
        'callback'
      ),
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
