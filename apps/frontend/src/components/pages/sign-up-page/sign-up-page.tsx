'use client';

import { Button, Flex, Input, useToast } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authService } from '../../../services';
import ResendEmailHelper from '../../resend-email-helper';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const router = useRouter();

  const toast = useToast({
    title: 'Error',
    isClosable: true,
    status: 'error',
    position: 'top-right',
  });

  const handleSignUpClick = async () => {
    try {
      await authService.signUp(email, password, confirmPassword);
      setIsEmailSent(true);
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 400) {
          toast({ description: e.response?.data.message[0] });
        } else if (e.response?.status === 409) {
          toast({ description: e.response?.data.message });
        } else if (e.response?.status === 500) {
          toast({ description: e.response?.data.message });
        }
      } else {
        toast({ description: 'Unknown Error' });
      }
    }
  };

  const handleSignInClick = async () => {
    await authService.signIn(email, password);
  };

  const handleGoogleSignInClick = async () => {
    router.replace(authService.getGoogleSignInUrl());
  };

  const handleSignInPageClick = () => {
    router.push('sign-in');
  };

  return (
    <Flex justify="center" direction="column" align="center" gap={4}>
      {isEmailSent ? (
        <ResendEmailHelper onClick={handleSignInClick} />
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

          <Button w="100%" onClick={handleSignInPageClick}>
            Go To Sign In
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
