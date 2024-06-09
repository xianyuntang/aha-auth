import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  CountActiveUsersQuery,
  CountAverageActiveUsersQuery,
  CountUsersQuery,
  GetUsersQuery,
} from './queries/impl';

@Controller('users')
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('count')
  async countUser() {
    return this.queryBus.execute(new CountUsersQuery());
  }

  @Get('active')
  async countActiveUsers() {
    return this.queryBus.execute(new CountActiveUsersQuery());
  }

  @Get('average')
  async countAverageActiveUsers() {
    return this.queryBus.execute(new CountAverageActiveUsersQuery());
  }

  @Get()
  async getUsers(@Query('cursor') cursor?: string) {
    return this.queryBus.execute(new GetUsersQuery(cursor));
  }
}
