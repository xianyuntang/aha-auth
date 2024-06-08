import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../orm';
import {
  JwtTokenService,
  PasswordService,
  SigninMailService,
} from '../../services';
import { LocalSignInCommand } from '../impl';

@CommandHandler(LocalSignInCommand)
export class LocalSignInHandler implements ICommandHandler<LocalSignInCommand> {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository,
    private readonly signinMailService: SigninMailService
  ) {}

  async execute(command: LocalSignInCommand) {
    const { email, password } = command;

    const exist = await this.userRepository.findOneOrFail(
      {
        email,
      },
      {
        failHandler: () =>
          new UnauthorizedException('Username and password do not match.'),
      }
    );

    const hashedPassword = await this.passwordService.hashPassword(password);

    const isPasswordMatched = await this.passwordService.isPasswordMatched(
      password,
      hashedPassword
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Username and password do not match.');
    }

    await this.signinMailService.sendSignInMail(exist);

    return { message: 'ok' };
  }
}
