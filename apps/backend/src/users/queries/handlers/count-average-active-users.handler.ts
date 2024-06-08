import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAverageActiveUserCountResponse } from 'common';
import dayjs from 'dayjs';

import { SignInHistory } from '../../../orm';
import { CountAverageActiveUsersQuery } from '../impl';

@QueryHandler(CountAverageActiveUsersQuery)
export class CountAverageActiveUsersHandler
  implements IQueryHandler<CountAverageActiveUsersQuery>
{
  constructor(private readonly em: EntityManager) {}

  async execute(): Promise<GetAverageActiveUserCountResponse> {
    const dayStart = dayjs().add(-7, 'days');

    const signInHistories = await this.em
      .createQueryBuilder(SignInHistory)
      .where({ createdAt: { $gte: dayStart } })
      .getResult();

    // group by date
    const userCountPerDay = signInHistories.reduce<Record<string, number>>(
      (dateCount, signInHistory) => {
        const date = dayjs(signInHistory.createdAt).format('YYYY-MM-DD');
        if (!dateCount[date]) {
          dateCount[date] = 1;
        }
        dateCount[date] += 1;
        return dateCount;
      },
      {}
    );

    // get average active users count
    const average = Object.values(userCountPerDay).reduce(
      (acc, curr) => acc + curr / 7,
      0
    );

    return { average };
  }
}
