import { Injectable } from '@nestjs/common';

import { MailerService } from '../../mailer';
import { User } from '../../orm';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class SigninMailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async sendSignInMail(user: User) {
    const signInLink = await this.jwtTokenService.getSignInLink(user);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your sign-in request',
      html: `<div>${signInLink}</div>`,
    });
  }
}
