import { EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import dayjs from 'dayjs';

import { User } from '../../../orm';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly em: EntityManager) {}
  async execute(query: GetUsersQuery) {
    const { cursor } = query;

    const qb = this.em
      .createQueryBuilder(User, 'u')
      .leftJoinAndSelect('u.signInHistories', 's')
      .orderBy({ createdAt: QueryOrder.ASC })
      .limit(3);

    const count = await qb.getCount();

    // If there are no user.
    if (count === 0) {
      return {
        data: [],
        count,
        nextCursor: null,
      };
    }

    if (cursor) {
      qb.andWhere({
        createdAt: { $gt: Buffer.from(cursor, 'base64').toString() },
      });
    }

    const users = await qb.getResultList();

    if (users.length === 0) {
      return {
        data: [],
        count,
        nextCursor: null,
      };
    }

    return {
      data: users.map((user) => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        lastSignInAt: user.signInHistories[0].createdAt,
        signInCount: user.signInHistories.count(),
      })),
      count,
      nextCursor: Buffer.from(
        dayjs(users[users.length - 1].createdAt).toISOString()
      ).toString('base64'),
    };
  }
}
