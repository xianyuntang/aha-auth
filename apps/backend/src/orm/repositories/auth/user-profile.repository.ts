import { EntityRepository } from '@mikro-orm/core';

import { UserProfile } from '../../entities';

export class UserProfileRepository extends EntityRepository<UserProfile> {}
