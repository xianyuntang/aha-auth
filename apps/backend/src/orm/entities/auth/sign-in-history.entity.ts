import { Entity, ManyToOne } from '@mikro-orm/core';

import { OauthUserRepository, User } from '../../../orm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({
  tableName: 'sign_in_histories',
  repository: () => OauthUserRepository,
})
export class SignInHistory extends CustomBaseEntity {
  @ManyToOne(() => User, {
    deleteRule: 'cascade',
  })
  user!: User;
}
