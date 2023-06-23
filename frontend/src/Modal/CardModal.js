import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import Card from '../component/Card';
const CardModal = ({data,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return(
    <>
     <span onClick={onOpen}>{children}</span>     
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
     
      <ModalContent>
      <ModalCloseButton />
        <ModalBody display="flex"    justifyContent="space-evenly" >
            <Card data ={data}/>
        </ModalBody>

      </ModalContent>
    </Modal>
    </>
   
  )
  
};

export default CardModal;
