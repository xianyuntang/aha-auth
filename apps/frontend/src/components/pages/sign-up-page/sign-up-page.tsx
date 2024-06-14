'use client';

import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { authService } from '../../../services';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSignUpClick = async () => {
    await authService.signIn(email, password);
  };

  return (
    <Flex justify="center" direction="column" align="center" gap={4}>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={onSignUpClick} w="100%">
        Sign Up
      </Button>

      <Button w="100%">Google Sign In</Button>
    </Flex>
  );
};

export default SignInPage;
