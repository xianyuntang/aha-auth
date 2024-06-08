import { CountActiveUsersHandler } from './count-active-users.handler';
import { CountAverageActiveUsersHandler } from './count-average-active-users.handler';
import { CountUsersHandler } from './count-users.handler';

export const queryHandlers = [
  CountAverageActiveUsersHandler,
  CountActiveUsersHandler,
  CountUsersHandler,
];
