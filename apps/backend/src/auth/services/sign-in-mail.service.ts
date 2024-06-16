import { Injectable, Logger } from '@nestjs/common';

import { AppConfigService } from '../../app-config';
import { MailerService } from '../../mailer';
import { User } from '../../orm';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class SignInMailService {
  private readonly logger = new Logger(SignInMailService.name);

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly mailerService: MailerService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  /**
   * Send a sign-in mail to the given user.
   */
  async sendSignInMail(user: User): Promise<void> {
    const signInLink = await this.jwtTokenService.getSignInLink(user);

    const {
      env: { isProduction },
    } = this.appConfigService;

    if (!isProduction) {
      this.logger.debug(`Sign-in link (not sent): ${signInLink}`);
    } else {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Confirm your sign-in request',
        html: `<div>${signInLink}</div>`,
      });
    }
  }
}
