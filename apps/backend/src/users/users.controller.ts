import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizedUser } from 'common';

import { CurrentUser } from '../auth';
import { UpdateUserProfileCommand } from './commands/impl';
import { UpdateUserProfileRequestDto } from './dto';
import {
  CountActiveUsersQuery,
  CountAverageActiveUsersQuery,
  CountUsersQuery,
  GetMeQuery,
  GetUsersQuery,
} from './queries/impl';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('me')
  async getMe(@CurrentUser() user: AuthorizedUser) {
    return this.queryBus.execute(new GetMeQuery(user.id));
  }

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

  @Put('me')
  async updateMyProfile(
    @CurrentUser() user: AuthorizedUser,
    @Body() dto: UpdateUserProfileRequestDto
  ) {
    return this.commandBus.execute(
      new UpdateUserProfileCommand(user.id, dto.firstName, dto.lastName)
    );
  }
}
