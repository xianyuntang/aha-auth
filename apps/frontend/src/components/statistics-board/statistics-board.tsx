'use client';

import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { userService } from '../../services';

const StatisticsBoard = () => {
  const { data } = useQuery(['statistics'], userService.getUsersStatistics);

  return (
    <Flex flexDir="column" w="400px">
      <Flex justify="space-between">
        <Box>Registered users</Box>
        <Box>{data?.count}</Box>
      </Flex>
      <Flex justify="space-between">
        <Box>Today active users</Box>
        <Box>{data?.active}</Box>
      </Flex>
      <Flex justify="space-between">
        <Box>Rolling average active users</Box>
        <Box>{data?.average}</Box>
      </Flex>
    </Flex>
  );
};

export default StatisticsBoard;
