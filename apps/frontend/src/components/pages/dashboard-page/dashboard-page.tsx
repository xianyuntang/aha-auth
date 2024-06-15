'use client';

import { Flex } from '@chakra-ui/react';
import { GetUsersResponse } from 'common';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useImmer } from 'use-immer';

import { userService } from '../../../services';
import StatisticsBoard from '../../statistics-board';
import UsersTable from '../../users-table';

const DashboardPage = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [tableData, setTableData] = useImmer<GetUsersResponse['data']>([]);
  const { data, isLoading } = useQuery(['users', cursor], () =>
    userService.getUsers(cursor)
  );

  const handleScrolldown = () => {
    if (data?.nextCursor) {
      setCursor(data?.nextCursor);
    }
  };

  useEffect(() => {
    if (data?.data) {
      setTableData((draft) => {
        draft.push(...data.data);
      });
    }
  }, [data, setTableData]);

  return (
    <Flex direction="column" align="start" gap={4} w="1200px">
      <StatisticsBoard />
      <UsersTable
        data={tableData}
        onScrolldown={handleScrolldown}
        isLoading={isLoading}
        noMoreData={
          data?.nextCursor === null || tableData.length === data?.count
        }
      />
    </Flex>
  );
};

export default DashboardPage;
