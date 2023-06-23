import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
  } from '@chakra-ui/react'
import Qrcode from '../component/Qrcode';
import { UrlState } from '../context/urlProvider';
  
function QRmodal({children,url}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {qr,setqr} =UrlState();
    return (
      <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose} size='sm'>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
            <Box display="flex">
            <Qrcode/>
              <Box display="flex" flexDirection="column" marginLeft="10px" justifyContent="space-evenly">
              <a download href={qr}><Button  color="white" backgroundColor="green.400" > PNG</Button></a>
              <a download href={qr}><Button  color="white" backgroundColor="green.400" > SVG</Button></a>
              <a download href={qr}><Button  color="white" backgroundColor="green.400" > JPEG</Button></a>
              </Box>
            </Box>
              
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default QRmodal;