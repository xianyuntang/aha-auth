import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from '../orm';
import { commandHandlers } from './commands/handlers';
import { queryHandlers } from './queries/handlers';
import { UsersController } from './users.controller';

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [...commandHandlers, ...queryHandlers],
})
export class UsersModule {}
