import { Flex } from '@chakra-ui/react';

interface RouteAppLayoutProps {
  children: React.ReactNode;
}

const RouteAppLayout = ({ children }: RouteAppLayoutProps) => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      {children}
    </Flex>
  );
};

export default RouteAppLayout;
