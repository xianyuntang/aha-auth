import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../orm';
import { JwtTokenService, PasswordService } from '../../services';
import { LocalSignInCommand } from '../impl';

@CommandHandler(LocalSignInCommand)
export class LocalSignInHandler implements ICommandHandler<LocalSignInCommand> {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository
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

    return {
      accessToken: this.jwtTokenService.issueAccessToken(exist),
      refreshToken: this.jwtTokenService.issueRefreshToken(exist),
    };
  }
}
