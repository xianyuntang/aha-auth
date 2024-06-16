import { EntityManager } from '@mikro-orm/postgresql';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OK_RESPONSE } from 'common';

import { UserRepository } from '../../../orm';
import { PasswordService, SignInMailService } from '../../services';
import { LocalSignUpCommand } from '../impl';

@CommandHandler(LocalSignUpCommand)
export class LocalSignUpHandler implements ICommandHandler<LocalSignUpCommand> {
  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly signinMailService: SignInMailService
  ) {}

  /**
   * Executes a local sign-up command.
   */
  async execute(command: LocalSignUpCommand): Promise<typeof OK_RESPONSE> {
    const { email, password } = command;

    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.em.transactional(async () => {
      const exist = await this.userRepository.findOne(
        { email },
        { fields: ['id'] }
      );
      if (exist) {
        throw new ConflictException('The email has been registered.');
      }

      return this.userRepository.create({
        email,
        password: hashedPassword,
        signInHistories: {},
        profile: {},
      });
    });

    await this.signinMailService.sendSignInMail(user);

    return OK_RESPONSE;
  }
}
