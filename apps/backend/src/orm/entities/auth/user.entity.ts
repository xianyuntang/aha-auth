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
  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  password?: string;

  @OneToOne(() => UserProfile, 'user', {
    orphanRemoval: true,
  })
  profile!: UserProfile;

  @OneToMany(() => OauthUser, 'user', {
    orphanRemoval: true,
  })
  oauthUsers = new Collection<OauthUser>(this);

  @Property({ default: false })
  isAdmin!: boolean & Opt;
}
