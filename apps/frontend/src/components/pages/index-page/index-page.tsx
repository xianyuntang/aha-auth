'use client';

import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../../../hooks';

const IndexPage = () => {
  const router = useRouter();

  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      router.replace('/dashboard');
    }
  }, [router, isLogin]);

  const onSignInClick = () => {
    router.push('sign-in');
  };
  const onSignUpClick = () => {
    router.push('sign-up');
  };

  return (
    <Flex justify="center" direction="column" align="center" gap={4}>
      <Button onClick={onSignInClick} w="100px">
        Sign In
      </Button>
      <Button onClick={onSignUpClick} w="100px">
        Sign Up
      </Button>
    </Flex>
  );
};

export default IndexPage;
