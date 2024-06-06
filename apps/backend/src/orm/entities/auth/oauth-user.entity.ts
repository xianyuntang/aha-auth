import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { OauthUserRepository, User } from '../../../orm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({
  tableName: 'oauth_users',
  repository: () => OauthUserRepository,
})
export class OauthUser extends CustomBaseEntity {
  @ManyToOne(() => User, {
    deleteRule: 'cascade',
  })
  user!: User;

  @Property()
  provider!: string;
}
