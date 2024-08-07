import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
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

  /**
   * Executes the reset password.
   */
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
        throw new ForbiddenException(
          'You dont have permission to change your password'
        );
      }

      const isPasswordMatched = await this.passwordService.isPasswordMatched(
        oldPassword,
        exist.password
      );

      // Throw error if old password is incorrect
      if (!isPasswordMatched) {
        throw new BadRequestException(['oldPassword is incorrect']);
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
