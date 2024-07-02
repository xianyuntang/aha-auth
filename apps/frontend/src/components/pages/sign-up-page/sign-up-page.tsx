'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authService } from '../../../services';
import ResentEmailHelper from '../../resent-email-helper';

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessages, setAlertMessages] = useState<string[]>([]);

  const router = useRouter();

  const handleSignUpClick = async () => {
    try {
      await authService.signUp(email, password, confirmPassword);
      setIsEmailSent(true);
      setIsAlertOpen(false);
      setAlertMessages([]);
    } catch (e) {
      if (isAxiosError(e)) {
        setIsAlertOpen(true);
        if (e.response?.status === 400) {
          setAlertMessages(
            (e.response?.data.message as string[]) || ['unknown Error']
          );
        } else if (e.response?.status === 409) {
          setAlertMessages([e.response?.data.message]);
        } else if (e.response?.status === 500) {
          setAlertMessages(['unknown error']);
        }
      } else {
        setAlertMessages(['unknown error']);
        setIsAlertOpen(true);
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
      {isAlertOpen && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription maxWidth="sm">
            {alertMessages.map((message, index) => (
              <Box key={index}>{message}</Box>
            ))}
          </AlertDescription>
        </Alert>
      )}
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

          <Button w="100%" onClick={handleSignInPageClick}>
            Go To Sign In
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
