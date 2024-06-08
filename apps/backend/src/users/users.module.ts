import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from '../orm';
import { queryHandlers } from './queries/handlers';
import { UsersController } from './users.controller';

@Module({
  imports: [CqrsModule, MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [...queryHandlers],
})
export class UsersModule {}
