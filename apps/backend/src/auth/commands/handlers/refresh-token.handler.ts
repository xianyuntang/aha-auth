import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../orm';
import { JwtTokenService } from '../../services';
import { RefreshTokenCommand } from '../impl';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository
  ) {}
  async execute(command: RefreshTokenCommand) {
    const { refreshToken } = command;

    const decodedJwtToken = await this.jwtTokenService.decodeRefreshToken(
      refreshToken
    );

    if (!decodedJwtToken) {
      throw new UnauthorizedException();
    }

    if (this.jwtTokenService.isTokenExpired(decodedJwtToken.exp)) {
      throw new UnauthorizedException();
    }

    const exist = await this.userRepository.findOneOrFail(
      {
        id: decodedJwtToken.sub,
      },
      { failHandler: () => new UnauthorizedException() }
    );

    return { accessToken: this.jwtTokenService.issueAccessToken(exist) };
  }
}
