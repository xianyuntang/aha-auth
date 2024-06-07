import { Test } from '@nestjs/testing';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = moduleRef.get<PasswordService>(PasswordService);
  });

  describe('hashPassword', () => {
    it('should return hashed password', async () => {
      const hashedPassword = await passwordService.hashPassword('test');
      expect(hashedPassword).toHaveLength(60);
    });
  });

  describe('isPasswordMatched', () => {
    it('should return true if password is matched', async () => {
      const hashedPassword = await passwordService.hashPassword('test');

      const isPasswordMatched = await passwordService.isPasswordMatched(
        'test',
        hashedPassword
      );

      expect(isPasswordMatched).toBe(true);
    });

    it('should return false if password is not matched', async () => {
      const hashedPassword = await passwordService.hashPassword('test');

      const isPasswordMatched = await passwordService.isPasswordMatched(
        'test-test',
        hashedPassword
      );

      expect(isPasswordMatched).toBe(false);
    });
  });
});
