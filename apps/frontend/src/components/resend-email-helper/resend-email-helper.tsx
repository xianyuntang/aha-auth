import { Box, Button, Text } from '@chakra-ui/react';

import { useTimer } from '../../hooks';

const ResendEmailHelper = ({ onClick }: { onClick: () => void }) => {
  const { time, start } = useTimer(30);

  const handleResendEmail = () => {
    start(30);
    onClick();
  };

  return (
    <Box>
      <Text>Please check your email to confirm sign in</Text>
      <Button onClick={handleResendEmail} isDisabled={time !== 0}>
        Resend Email
      </Button>
      {time !== 0 && <span>Resend available after {time} seconds</span>}
    </Box>
  );
};

export default ResendEmailHelper;
