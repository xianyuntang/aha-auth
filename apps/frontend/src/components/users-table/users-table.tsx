import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { GetUsersResponse } from 'common';
import { useEffect, useState } from 'react';

const columnHelper = createColumnHelper<GetUsersResponse['data'][0]>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
    size: 100,
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'Email',
    size: 100,
  }),
  columnHelper.accessor('signUpAt', {
    cell: (info) => info.getValue(),
    header: 'Sign up at',
    size: 100,
  }),
  columnHelper.accessor('lastSignInAt', {
    cell: (info) => info.getValue(),
    header: 'Last sign in at',
    size: 100,
  }),
  columnHelper.accessor('signInCount', {
    cell: (info) => info.getValue(),
    header: 'Sign in count',
    size: 100,
  }),
];

const UsersTable = ({
  data,
  isLoading,
  noMoreData,
  onScrolldown,
}: {
  data: GetUsersResponse['data'][0][];
  isLoading: boolean;
  noMoreData: boolean;
  onScrolldown: () => void;
}) => {
  const [tableContainerRef, setTableContainerRef] =
    useState<HTMLDivElement | null>(null);

  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (
        tableContainerRef &&
        tableContainerRef.scrollHeight ===
          tableContainerRef.scrollTop + tableContainerRef.clientHeight &&
        !isLoading
      ) {
        onScrolldown();
        setPrevScrollHeight(tableContainerRef.scrollHeight);
      }
    };
    if (tableContainerRef) {
      tableContainerRef.addEventListener('scroll', handleScroll);
      return () =>
        tableContainerRef.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, onScrolldown, tableContainerRef]);

  useEffect(() => {
    tableContainerRef?.scrollTo({ top: prevScrollHeight });
  }, [data, tableContainerRef, prevScrollHeight]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer h="400px" overflowY="scroll" ref={setTableContainerRef}>
      <Table>
        <TableCaption>
          {noMoreData ? 'No more data' : 'Loading...'}
        </TableCaption>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} w={`${header.getSize()}px`}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
