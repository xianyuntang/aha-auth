import { wrap } from '@mikro-orm/core';
import { EntityManager, NotFoundError } from '@mikro-orm/postgresql';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import Error from 'next/error';

import { UserRepository } from '../../../orm';
import { UpdateUserProfileCommand } from '../impl';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler
  implements ICommandHandler<UpdateUserProfileCommand>
{
  constructor(
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: UpdateUserProfileCommand) {
    const { userId, firstName, lastName } = command;

    await this.em.transactional(async () => {
      const exist = await this.userRepository.findOne({ id: userId });
      if (!exist) {
        throw new NotFoundException();
      }
      wrap(exist).assign({ profile: { firstName, lastName } });
    });

    return { message: 'ok' };
  }
}
