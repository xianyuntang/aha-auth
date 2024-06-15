'use client';

import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../../hooks';

export const AppHeader = () => {
  const router = useRouter();

  const { updateAccessToken, updateRefreshToken } = useAuth();

  const onDashboardLinkClick = () => {
    router.push('dashboard');
  };

  const onUserStatisticsLinkClick = () => {
    router.push('statistics');
  };

  const onLogoutClick = () => {
    updateAccessToken('');
    updateRefreshToken('');
    router.push('/');
  };

  return (
    <Flex justify="space-between" pos="fixed">
      <Flex>
        <Button onClick={onDashboardLinkClick}>Dashboard</Button>
        <Button onClick={onUserStatisticsLinkClick}>User statistics</Button>
      </Flex>
      <Flex>
        <Button onClick={onLogoutClick}>Logout</Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
