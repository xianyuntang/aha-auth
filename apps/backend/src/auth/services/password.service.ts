import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs';

import { BCRYPT_ROUNDS } from '../auth.constant';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    return bcryptjs.hash(password, await bcryptjs.genSalt(BCRYPT_ROUNDS));
  }

  /**
   * Checks if the provided password matches the hashed password.
   *
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  async isPasswordMatched(password: string, hashedPassword: string) {
    return bcryptjs.compare(password, hashedPassword);
  }
}
