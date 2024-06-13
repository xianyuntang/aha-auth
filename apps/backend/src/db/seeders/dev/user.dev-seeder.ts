import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import bcryptjs from 'bcryptjs';
import { testUser } from 'common';

import { BCRYPT_ROUNDS } from '../../../auth';
import { User } from '../../../orm';

export class UserDevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userRepository = em.getRepository(User);

    const { id, email, password } = testUser;
    const exist = await userRepository.findOne({ id });
    if (exist) {
      return;
    }

    userRepository.create({
      id,
      email,
      password: await bcryptjs.hash(
        password,
        await bcryptjs.genSalt(BCRYPT_ROUNDS)
      ),
      profile: {},
    });
  }
}
