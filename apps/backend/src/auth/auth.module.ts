import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { OauthUser, User, UserProfile } from '../orm';
import { AuthController } from './auth.controller';
import { commandHandlers } from './commands/handlers';
import { JwtAuthGuard } from './guards';
import {
  JwtTokenService,
  PasswordService,
  SigninMailService,
} from './services';
import { GoogleOauthStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature([User, UserProfile, OauthUser]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    ...commandHandlers,
    PasswordService,
    JwtTokenService,
    JwtStrategy,
    GoogleOauthStrategy,
    SigninMailService,
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
