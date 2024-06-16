import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs';

import { BCRYPT_ROUNDS } from '../auth.constant';

@Injectable()
export class PasswordService {
  /**
   * Hashes a password with bcrypt.
   */
  async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, await bcryptjs.genSalt(BCRYPT_ROUNDS));
  }

  /**
   * Checks if the provided password matches the hashed password.
   */
  async isPasswordMatched(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  }
}
