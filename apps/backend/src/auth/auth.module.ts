import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { OauthUser, User, UserProfile } from '../orm';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile, OauthUser])],
})
export class AuthModule {}
