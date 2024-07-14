import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../../orm';
import { JwtTokenService } from '../../services';
import { VerifyEmailCommand } from '../impl';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: VerifyEmailCommand) {
    const { accessToken } = command;
    const jwtTokenPayload = await this.jwtTokenService.decodeAccessToken(
      accessToken
    );

    if (!jwtTokenPayload) {
      throw new UnauthorizedException();
    }

    const {
      user: { id },
    } = jwtTokenPayload;

    const user = await this.em.transactional(async () => {
      const user = await this.userRepository.findOneOrFail(
        { id, verified: false },
        { failHandler: () => new UnauthorizedException() }
      );

      wrap(user).assign({ verified: true, signInHistories: {} });

      return user;
    });

    return this.jwtTokenService.getSignInLink(user);
  }
}
