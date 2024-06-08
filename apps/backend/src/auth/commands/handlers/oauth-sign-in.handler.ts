import { EntityManager, wrap } from '@mikro-orm/core';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExtractArrayElementType } from 'common';
import { Profile } from 'passport-google-oauth20';

import { OauthUserRepository, UserRepository } from '../../../orm';
import { JwtTokenService } from '../../services';
import { OauthSignInCommand } from '../impl';

@CommandHandler(OauthSignInCommand)
export class OauthSignInHandler implements ICommandHandler<OauthSignInCommand> {
  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly oauthUserRepository: OauthUserRepository,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  /**
   * Executes the OAuth sign-in process.
   *
   * @param {OauthSignInCommand} command
   * @throws {BadRequestException} If no valid email is found.
   * @returns {Promise<string>} The sign-in link
   */
  async execute(command: OauthSignInCommand): Promise<string> {
    const {
      profile: { provider, emails, name },
    } = command;

    const email = this.getVerifiedEmail(emails);

    if (!email) {
      throw new BadRequestException('No valid email found.');
    }

    const user = await this.em.transactional(async () => {
      const user = await this.userRepository.findOne({ email: email?.value });

      if (user) {
        const oauthUsers = await this.oauthUserRepository.findOne({
          user,
          provider,
        });
        if (!oauthUsers) {
          wrap(user).assign({
            profile: { firstName: name?.givenName, lastName: name?.familyName },
            oauthUsers: { provider },
            signInHistories: {},
          });
        }
      } else {
        return this.userRepository.create({
          email: email.value,
          profile: { firstName: name?.givenName, lastName: name?.familyName },
          oauthUsers: { provider },
          signInHistories: {},
        });
      }
      return user;
    });

    return this.jwtTokenService.getSignInLink(user);
  }

  /**
   * Retrieves the verified email from a list of email.
   *
   * @param {Profile['emails']} emails - emails from oauth provider
   * @return {ExtractArrayElementType<NonNullable<Profile['emails']>> | null}
   */
  private getVerifiedEmail(
    emails: Profile['emails']
  ): ExtractArrayElementType<NonNullable<Profile['emails']>> | null {
    if (!emails) {
      return null;
    }
    for (const email of emails) {
      if (email.verified) {
        return email;
      }
    }
    return null;
  }
}
