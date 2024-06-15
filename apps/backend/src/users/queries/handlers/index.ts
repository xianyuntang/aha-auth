import { GetMeHandler } from './get-me.handler';
import { GetUserStatisticsHandler } from './get-user-statistics.handler';
import { GetUsersHandler } from './get-users.handler';

export const queryHandlers = [
  GetUserStatisticsHandler,
  GetMeHandler,
  GetUsersHandler,
];
