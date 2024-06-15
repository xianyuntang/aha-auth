'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { useAuth } from '../../../hooks';
import { userService } from '../../../services';
import ResetPasswordModal from '../../reset-password-modal';
import UpdateProfileModal from '../../update-profile-modal';

const ProfilePage = () => {
  const {
    isOpen: isRestPasswordModalOpen,
    onOpen: onResetPasswordModalOpen,
    onClose: onResetPasswordModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateProfileModalOpen,
    onOpen: onUpdateProfileModalOpen,
    onClose: onUpdateProfileModalClose,
  } = useDisclosure();

  const { data, refetch } = useQuery(['me'], userService.getMe);

  const { logout } = useAuth();

  const handleOnSave = async () => {
    await refetch();
  };

  const handleLogoutClick = () => {
    logout();
  };

  if (!data) {
    return <div />;
  }

  return (
    <Flex justify="center" flexDir="column">
      <Box>
        <Box>Email: {data?.email}</Box>
        <Box>First Name: {data?.profile.firstName}</Box>
        <Box>Last Name: {data?.profile.lastName}</Box>
        <ButtonGroup>
          <Button onClick={onUpdateProfileModalOpen}>Update Profile</Button>
          <Button onClick={onResetPasswordModalOpen}>Reset Password</Button>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </ButtonGroup>
      </Box>
      <UpdateProfileModal
        isOpen={isUpdateProfileModalOpen}
        onClose={onUpdateProfileModalClose}
        onSave={handleOnSave}
      />
      <ResetPasswordModal
        isOpen={isRestPasswordModalOpen}
        onClose={onResetPasswordModalClose}
      />
    </Flex>
  );
};

export default ProfilePage;
