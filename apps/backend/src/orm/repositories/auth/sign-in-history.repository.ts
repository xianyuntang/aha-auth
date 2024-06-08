import { EntityRepository } from '@mikro-orm/core';

import { SignInHistory } from '../../entities/auth/sign-in-history.entity';

export class SignInHistoryRepository extends EntityRepository<SignInHistory> {}
