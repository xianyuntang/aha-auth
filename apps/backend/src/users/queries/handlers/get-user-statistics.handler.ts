import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersStatisticsResponse } from 'common';
import dayjs from 'dayjs';

import { SignInHistory, User } from '../../../orm';
import { GetUsersStatisticsQuery } from '../impl';

@QueryHandler(GetUsersStatisticsQuery)
export class GetUserStatisticsHandler
  implements IQueryHandler<GetUsersStatisticsQuery>
{
  constructor(private readonly em: EntityManager) {}

  async execute(): Promise<GetUsersStatisticsResponse> {
    return {
      count: await this.getCount(),
      average: await this.getRollingAverage(),
      active: await this.getActive(),
    };
  }

  private async getRollingAverage() {
    const signInHistories = await this.em
      .createQueryBuilder(SignInHistory)
      .where({ createdAt: { $gte: dayjs().add(-7, 'days') } })
      .getResult();

    // group by date
    const userCountPerDay = signInHistories.reduce<Record<string, number>>(
      (dateCount, signInHistory) => {
        const date = dayjs(signInHistory.createdAt).format('YYYY-MM-DD');
        const key = date + signInHistory.user.id;
        if (!dateCount[key]) {
          dateCount[key] = 1;
        }
        return dateCount;
      },
      {}
    );

    // get average active users count
    return Object.values(userCountPerDay).reduce(
      (acc, curr) => acc + curr / 7,
      0
    );
  }

  private async getCount() {
    return this.em.createQueryBuilder(User).count();
  }

  private async getActive() {
    return this.em
      .createQueryBuilder(User)
      .where({
        signInHistories: {
          createdAt: { $gte: dayjs().startOf('day').toISOString() },
        },
      })
      .distinct()
      .count();
  }
}
