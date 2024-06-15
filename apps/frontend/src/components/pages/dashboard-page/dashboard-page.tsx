'use client';

import { Flex } from '@chakra-ui/react';
import { GetUsersResponse } from 'common';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useImmer } from 'use-immer';

import { userService } from '../../../services';
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
    <Flex justify="center" direction="column" align="center" gap={4}>
      <UsersTable
        data={tableData}
        onScrolldown={handleScrolldown}
        isLoading={isLoading}
        noMoreData={data?.nextCursor === null}
      />
    </Flex>
  );
};

export default DashboardPage;
