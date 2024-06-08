import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';

import { UserRepository } from '../../repositories';
import { CustomBaseEntity } from '../custom-base.entity';
import { OauthUser } from './oauth-user.entity';
import { SignInHistory } from './sign-in-history.entity';
import { UserProfile } from './user-profile.entity';

@Entity({ tableName: 'users', repository: () => UserRepository })
export class User extends CustomBaseEntity {
  @Property({ unique: true, length: 254 })
  email!: string;

  @Property({ nullable: true, length: 60, hidden: true })
  password?: string;

  @OneToOne(() => UserProfile, 'user', {
    orphanRemoval: true,
  })
  profile!: UserProfile;

  @OneToMany(() => OauthUser, 'user')
  oauthUsers = new Collection<OauthUser>(this);

  @OneToMany(() => SignInHistory, 'user')
  signInHistories = new Collection<SignInHistory>(this);
}
