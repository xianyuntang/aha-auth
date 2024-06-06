import { EntityRepository } from '@mikro-orm/core';

import { OauthUser } from '../../entities';

export class OauthUserRepository extends EntityRepository<OauthUser> {}
