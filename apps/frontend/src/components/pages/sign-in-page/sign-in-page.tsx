'use client';

import { Button, Flex, Input } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../hooks';
import { authService } from '../../../services';
import ResentEmailHelper from '../../resent-email-helper';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const { isLogin, updateAccessToken, updateRefreshToken } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (accessToken && refreshToken) {
      updateAccessToken(accessToken);
      updateRefreshToken(refreshToken);
    }
  }, [searchParams, router, updateRefreshToken, updateAccessToken]);

  useEffect(() => {
    if (isLogin) {
      router.push('dashboard');
    }
  }, [isLogin, router]);

  const handleSignInClick = async () => {
    await authService.signIn(email, password);
    setIsEmailSent(true);
  };

  const handleGoogleSignInClick = async () => {
    router.replace(authService.getGoogleSignInUrl());
  };

  const handleSignUpClick = () => {
    router.push('sign-up');
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
          <Button w="100%" onClick={handleSignInClick}>
            Sign In
          </Button>

          <Button w="100%" onClick={handleGoogleSignInClick}>
            Google Sign In
          </Button>

          <Button w="100%" onClick={handleSignUpClick}>
            Go To Sign Up
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
