import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../orm';
import { PasswordService, SignInMailService } from '../../services';
import { LocalSignInCommand } from '../impl';

@CommandHandler(LocalSignInCommand)
export class LocalSignInHandler implements ICommandHandler<LocalSignInCommand> {
  constructor(
    private readonly em: EntityManager,
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
    private readonly signinMailService: SignInMailService
  ) {}

  async execute(command: LocalSignInCommand) {
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

      wrap(exist).assign({ signInHistories: {} });

      return exist;
    });

    await this.signinMailService.sendSignInMail(user);

    return { message: 'ok' };
  }
}
