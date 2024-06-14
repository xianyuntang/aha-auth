'use client';

import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { setAccessToken, setRefreshToken } from '../../../core';
import { authService } from '../../../services';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [searchParams]);

  const onSignInClick = async () => {
    await authService.signIn(email, password);
    setIsLogin(true);
  };

  const onGoogleSignInClick = async () => {
    router.replace(authService.getGoogleSignInUrl());
  };

  return (
    <Flex justify="center" direction="column" align="center" gap={4}>
      {isLogin ? (
        <Text>Please check your email to confirm sign in</Text>
      ) : (
        <>
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
          <Button w="100%" onClick={onSignInClick}>
            Sign In
          </Button>

          <Button w="100%" onClick={onGoogleSignInClick}>
            Google Sign In
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
