import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInResponse } from 'common';

import { UserRepository } from '../../../orm';
import {
  JwtTokenService,
  PasswordService,
  SignInMailService,
} from '../../services';
import { LocalSignInCommand } from '../impl';

@CommandHandler(LocalSignInCommand)
export class LocalSignInHandler implements ICommandHandler<LocalSignInCommand> {
  constructor(
    private readonly em: EntityManager,
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly signinMailService: SignInMailService
  ) {}

  /**
   * Executes a local sign-in command.
   */
  async execute(command: LocalSignInCommand): Promise<SignInResponse> {
    const { email, password } = command;

    const user = await this.em.transactional(async () => {
      const exist = await this.userRepository.findOneOrFail(
        {
          email,
        },
        {
          failHandler: () =>
            new UnauthorizedException('Username and password do not match.'),
        }
      );

      // Throw error if user is registered by oauth
      if (!exist.password) {
        throw new UnauthorizedException();
      }

      const isPasswordMatched = await this.passwordService.isPasswordMatched(
        password,
        exist.password
      );

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Username and password do not match.');
      }

      if (!exist?.verified) {
        await this.signinMailService.sendVerifyMail(exist);
        throw new ForbiddenException("You don't have permission to sign in.");
      }

      wrap(exist).assign({ signInHistories: {} });

      return exist;
    });

    const accessToken = this.jwtTokenService.issueAccessToken(user);
    const refreshToken = this.jwtTokenService.issueRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
