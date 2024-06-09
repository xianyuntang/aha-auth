import { CountActiveUsersHandler } from './count-active-users.handler';
import { CountAverageActiveUsersHandler } from './count-average-active-users.handler';
import { CountUsersHandler } from './count-users.handler';
import { GetUsersHandler } from './get-users.handler';

export const queryHandlers = [
  CountAverageActiveUsersHandler,
  CountActiveUsersHandler,
  CountUsersHandler,
  GetUsersHandler,
];
