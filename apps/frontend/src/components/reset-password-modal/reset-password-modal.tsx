import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { authService } from '../../services';

const ResetPasswordModal = ({
  disabled,
  isOpen,
  onClose,
}: {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const toast = useToast({
    title: 'Error',
    isClosable: true,
    status: 'error',
    position: 'top-right',
  });

  const handleSaveClick = async () => {
    try {
      await authService.resetPassword(oldPassword, password, confirmPassword);
      toast({ title: 'Success', isClosable: true, status: 'success' });
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
      onClose();
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 400) {
          toast({ description: e.response?.data.message[0] });
        } else if (e.response?.status === 403) {
          toast({ description: e.response?.data.message });
        } else if (e.response?.status === 429) {
          toast({ description: e.response?.data.message });
        } else if (e.response?.status === 500) {
          toast({ description: e.response?.data.message });
        }
      } else {
        toast({ description: 'Unknown Error' });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {disabled ? (
            <div>You can not change your password</div>
          ) : (
            <>
              <FormControl>
                <FormLabel>Old password</FormLabel>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(v) => setOldPassword(v.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(v) => setPassword(v.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(v) => setConfirmPassword(v.target.value)}
                />
              </FormControl>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {disabled ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <Button onClick={handleSaveClick}>Save</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
