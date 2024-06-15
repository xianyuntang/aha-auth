import { EntityManager } from '@mikro-orm/postgresql';
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeResponse } from 'common';

import { User } from '../../../orm';
import { GetMeQuery } from '../impl';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(private readonly em: EntityManager) {}

  async execute(query: GetMeQuery): Promise<GetMeResponse> {
    const { userId } = query;
    const user = await this.em
      .createQueryBuilder(User, 'u')
      .select(['id', 'email', 'p.firstName', 'p.lastName'])
      .where({ id: userId })
      .leftJoinAndSelect('u.profile', 'p')
      .getSingleResult();

    if (!user) {
      throw new NotFoundException();
    }

    return {
      id: user.id,
      email: user.email,
      profile: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
      },
    };
  }
}
