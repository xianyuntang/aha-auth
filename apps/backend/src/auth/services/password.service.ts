import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs';

import { BCRYPT_ROUNDS } from '../auth.constant';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    return bcryptjs.hash(password, await bcryptjs.genSalt(BCRYPT_ROUNDS));
  }

  async isPasswordMatched(password: string, hashedPassword: string) {
    return bcryptjs.compare(password, hashedPassword);
  }
}
