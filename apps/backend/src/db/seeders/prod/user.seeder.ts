import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import bcryptjs from 'bcryptjs';

import { BCRYPT_ROUNDS } from '../../../auth';
import { User } from '../../../orm';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userRepository = em.getRepository(User);

    for (let i = 0; i++; i < 100) {
      const email = `test-${i}@example.com`;
      const exist = await userRepository.findOne({ email });
      if (exist) {
        continue;
      }
      userRepository.create({
        email,
        password: await bcryptjs.hash(
          '1qaz@WSX',
          await bcryptjs.genSalt(BCRYPT_ROUNDS)
        ),
        profile: {},
      });
    }
  }
}
