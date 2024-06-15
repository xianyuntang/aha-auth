'use client';

import { Flex } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppHeader from '../../components/app-header';
import { useAuth } from '../../hooks';

interface RouteAppLayoutProps {
  children: React.ReactNode;
}

const RouteAppLayout = ({ children }: RouteAppLayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());

  const { isLogin } = useAuth();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {isLogin && <AppHeader />}
          <Flex h="100vh" w="100vw" justify="center" align="center">
            {children}
          </Flex>
        </ChakraProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default RouteAppLayout;
