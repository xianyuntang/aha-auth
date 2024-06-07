import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { OauthUser, User, UserProfile } from '../orm';
import { AuthController } from './auth.controller';
import { commandHandlers } from './commands/handlers';
import { JwtTokenService, PasswordService } from './services';

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature([User, UserProfile, OauthUser]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [...commandHandlers, PasswordService, JwtTokenService],
})
export class AuthModule {}
