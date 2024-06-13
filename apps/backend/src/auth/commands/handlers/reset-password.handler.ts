import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OK_RESPONSE } from 'common';

import { User } from '../../../orm';
import { PasswordService } from '../../services';
import { ResetPasswordCommand } from '../impl';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly passwordService: PasswordService
  ) {}
  async execute(command: ResetPasswordCommand) {
    const { email, password, oldPassword } = command;

    await this.em.transactional(async () => {
      const exist = await this.em.findOne(User, { email });

      // Throw error if user not exist
      if (!exist) {
        throw new UnauthorizedException();
      }

      // Throw error if user is registered by oauth
      if (!exist.password) {
        throw new UnauthorizedException();
      }

      const isPasswordMatched = await this.passwordService.isPasswordMatched(
        oldPassword,
        exist.password
      );

      // Throw error if old password is incorrect
      if (!isPasswordMatched) {
        throw new UnauthorizedException();
      }

      // Updated password hash
      const hashedPassword = await this.passwordService.hashPassword(password);

      wrap(exist).assign({
        password: hashedPassword,
      });
    });

    return OK_RESPONSE;
  }
}
