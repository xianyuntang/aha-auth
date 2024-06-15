'use client';

import { Button, Flex, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authService } from '../../../services';
import ResentEmailHelper from '../../resent-email-helper';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUpClick = async () => {
    await authService.signUp(email, password, confirmPassword);
    setIsEmailSent(true);
  };

  const handleSignInClick = async () => {
    await authService.signIn(email, password);
  };

  const handleGoogleSignInClick = async () => {
    router.replace(authService.getGoogleSignInUrl());
  };

  return (
    <Flex justify="center" direction="column" align="center" gap={4}>
      {isEmailSent ? (
        <ResentEmailHelper onClick={handleSignInClick} />
      ) : (
        <>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleSignUpClick} w="100%">
            Sign Up
          </Button>

          <Button w="100%" onClick={handleGoogleSignInClick}>
            Google Sign In
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
