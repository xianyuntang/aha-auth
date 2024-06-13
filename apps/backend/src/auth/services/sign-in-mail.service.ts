import { Injectable } from '@nestjs/common';

import { MailerService } from '../../mailer';
import { User } from '../../orm';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class SignInMailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  /**
   * Send a sign-in mail to the given user.
   *
   * @param {User} user
   * @return {Promise<void>}
   */
  async sendSignInMail(user: User): Promise<void> {
    const signInLink = await this.jwtTokenService.getSignInLink(user);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Confirm your sign-in request',
      html: `<div>${signInLink}</div>`,
    });
  }
}
