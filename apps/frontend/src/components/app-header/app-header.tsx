'use client';

import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const AppHeader = () => {
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('dashboard');
  };

  const handleStatisticsClick = () => {
    router.push('statistics');
  };

  const handleProfileClick = () => {
    router.push('profile');
  };

  return (
    <Flex justify="space-between" pos="fixed">
      <Flex>
        <Button onClick={handleProfileClick}>Profile</Button>
        <Button onClick={handleDashboardClick}>Dashboard</Button>
        <Button onClick={handleStatisticsClick}>statistics</Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
