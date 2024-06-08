import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import dayjs from 'dayjs';

import { User } from '../../../orm';
import { CountActiveUsersQuery } from '../impl';

@QueryHandler(CountActiveUsersQuery)
export class CountActiveUsersHandler
  implements IQueryHandler<CountActiveUsersQuery>
{
  constructor(private readonly em: EntityManager) {}

  async execute() {
    const dayStart = dayjs().startOf('day').toISOString();

    const count = await this.em
      .createQueryBuilder(User)
      .where({ signInHistories: { createdAt: { $gte: dayStart } } })
      .distinct()
      .count();

    return { count };
  }
}
