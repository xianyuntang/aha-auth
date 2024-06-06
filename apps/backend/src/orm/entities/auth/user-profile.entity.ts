import { Entity, OneToOne, Property } from '@mikro-orm/core';

import { User, UserProfileRepository } from '../../../orm';
import { CustomBaseEntity } from '../custom-base.entity';

@Entity({
  tableName: 'user_profiles',
  repository: () => UserProfileRepository,
})
export class UserProfile extends CustomBaseEntity {
  @OneToOne(() => User, (user) => user.profile, {
    owner: true,
    deleteRule: 'cascade',
  })
  user!: User;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ nullable: true })
  address?: string;
}
