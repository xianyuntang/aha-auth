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

import { userService } from '../../services';

const UpdateProfileModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const toast = useToast({
    status: 'error',
    isClosable: true,
    position: 'top-right',
  });

  const handleSaveClick = async () => {
    try {
      await userService.updateMe(firstName, lastName);
      onSave();
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          description: e.response?.data.message[0],
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              onChange={(v) => setFirstName(v.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              value={lastName}
              onChange={(v) => setLastName(v.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSaveClick}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
