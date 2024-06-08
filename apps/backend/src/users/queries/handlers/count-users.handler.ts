import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserCountResponse } from 'common';

import { User } from '../../../orm';
import { CountUsersQuery } from '../impl';

@QueryHandler(CountUsersQuery)
export class CountUsersHandler implements IQueryHandler<CountUsersQuery> {
  constructor(private readonly em: EntityManager) {}

  async execute(): Promise<GetUserCountResponse> {
    const count = await this.em.createQueryBuilder(User).count();

    return { count };
  }
}
