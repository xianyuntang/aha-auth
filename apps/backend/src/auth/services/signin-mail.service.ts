import { Injectable } from '@nestjs/common';
import urljoin from 'url-join';

import { AppConfigService } from '../../app-config';
import { MailerService } from '../../mailer';
import { User } from '../../orm';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class SigninMailService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly mailerService: MailerService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async sendSignInMail(user: User) {
    const {
      server: { externalUrl, prefix },
    } = this.appConfigService;
    const accessToken = this.jwtTokenService.issueAccessToken(user);
    const refreshToken = this.jwtTokenService.issueRefreshToken(user);

    const signInLink = urljoin(
      externalUrl,
      prefix,
      'sign-in',
      `?accessToken=${accessToken}`,
      `?refreshToken=${refreshToken}`
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your sign-in request',
      html: `<div>${signInLink}</div>`,
    });
  }
}
