import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Opt,
  Property,
} from '@mikro-orm/core';

import { UserRepository } from '../../repositories';
import { CustomBaseEntity } from '../custom-base.entity';
import { OauthUser } from './oauth-user.entity';
import { UserProfile } from './user-profile.entity';

@Entity({ tableName: 'users', repository: () => UserRepository })
export class User extends CustomBaseEntity {
  @Property({ unique: true, length: 254 })
  email!: string;

  @Property({ nullable: true, length: 60, hidden: true })
  password?: string;

  @Property()
  lastLoggedAt!: Date;

  // sing up action as sign in actions
  @Property({ default: 1, onCreate: () => 1 })
  signInCount!: Opt & number;

  @OneToOne(() => UserProfile, 'user', {
    orphanRemoval: true,
  })
  profile!: UserProfile;

  @OneToMany(() => OauthUser, 'user', {
    orphanRemoval: true,
  })
  oauthUsers = new Collection<OauthUser>(this);
}
