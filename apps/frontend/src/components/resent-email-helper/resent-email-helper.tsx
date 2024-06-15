import { Box, Button, Text } from '@chakra-ui/react';

const ResentEmailHelper = ({ onClick }: { onClick: () => void }) => {
  const handleResentEmail = () => {
    onClick();
  };
  return (
    <Box>
      <Text>Please check your email to confirm sign in</Text>
      <Button onClick={handleResentEmail}>Reset Email</Button>
    </Box>
  );
};

export default ResentEmailHelper;
