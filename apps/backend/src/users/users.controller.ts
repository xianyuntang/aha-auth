import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizedUser } from 'common';

import { CurrentUser, Public } from '../auth';
import { UpdateUserProfileCommand } from './commands/impl';
import { UpdateUserProfileRequestDto } from './dto';
import {
  GetMeQuery,
  GetUsersQuery,
  GetUsersStatisticsQuery,
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

  @Public()
  @Get('statistics')
  async countUser() {
    return this.queryBus.execute(new GetUsersStatisticsQuery());
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
