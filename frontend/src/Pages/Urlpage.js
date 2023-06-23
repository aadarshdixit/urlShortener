import { Box, Button, Icon, IconButton, Input, Text, Tooltip, useToast } from '@chakra-ui/react';
import { AiFillCopy, AiOutlineLink, AiOutlineQrcode } from 'react-icons/ai';
import { GoBook, GoLinkExternal } from 'react-icons/go';
import { useEffect, useState } from 'react';
import copy from "copy-to-clipboard";
import axios from "axios";
import React, { useRef } from 'react';
import QRmodal from '../Modal/QRmodal';
import QRcode from 'qrcode';
import { UrlState } from '../context/urlProvider';
import SideBar from '../component/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
const Urlpage = () => {
  const [user,setUser] = useState();
  const navigate = useNavigate();
     let location = useLocation();
     useEffect(() => {
       const x = JSON.parse(localStorage.getItem("userInfo"));
      setUser(x);
       if (!x) {
        navigate("/");
        alert('first login or register(if not created the account)')
      }
     }, [location]);
     
  const {orgUrl, setorgUrl} = UrlState();
  const [note,setnote] =  useState();
  const {short, setShort} = UrlState();
  const [loading, setLoading] = useState(false);
  const {searchResult,setSearchResult} = UrlState();
  const [Disabled,setDisabled] = useState(false);
  const toast = useToast();
  const {qr,setqr} = UrlState();
  const generateQRcode=async(short)=>{
    console.log("clicked");
    // setShort(searchResult.shortUrl);
    QRcode.toDataURL(
      (short),{
            width:220,
            margin:2,
            color:{
                dark: "#335383FF" ,
                light: "#EEEEEEFF"
            }
        },
        (err,short)=>{
            if(err) console.log(err);
           setqr(short);
        }
    )
    
}

  const handleSubmit = async () => {
    setLoading(true);
    if (!orgUrl) {
      toast({
        title: 'Invalid Input.',
        description: "please enter the long link",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
        const {data} = await axios.post('/api/url',{orgUrl:orgUrl,note:note},config);
        console.log(data);
      setSearchResult(data);
      setShort(data.shortUrl)
      setDisabled(true);
      generateQRcode(data.shortUrl);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  const handleCopy  =()=>{
    copy(searchResult.shortUrl);
    toast({
      title: 'Success.',
      description: "successfully copied to clipboard",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }
  const handleShortenAnother =()=>{
    setDisabled(false);
    setSearchResult('');
    setorgUrl('');
    setnote('');
  }
  const handleVisit=()=>{
    window.open(searchResult.shortUrl, '_blank', 'noopener,noreferrer');
  }

 
  return (
    <>
    <SideBar/>
      <Box w="100vw"
        h="100vh"
        backgroundImage="linear-gradient(to bottom right, green.500, green.100)"
        backgroundRepeat="no-repeat"
        backgroundSize="cover" display="flex" flexDirection="column" justifyContent="space-evenly">
        <Box p={4}
          bg="gray.200"
          borderRadius="md"
          boxShadow="md"
          maxW="600px"
          mx="auto">
          <Box display="flex" >
            <Icon as={AiOutlineLink} boxSize={4} marginRight="5px" />
            <Text fontWeight="bold" > Shorten a long URL</Text>
          </Box>
          <Input placeholder="Enter long link here"
            onChange={(e) => { setorgUrl(e.target.value) }}
            value={orgUrl}
            marginTop="10px" minWidth="500px" border="1px" borderColor='gray.300' isReadOnly={Disabled}></Input>


            <Box display="flex" marginTop="5px" >
            <Icon as={GoBook} boxSize={4} marginRight="5px" />
            <Text fontWeight="bold" >Add Note related to url</Text>
          </Box>
          <Input placeholder="Add note related to url"
            onChange={(e) => {setnote(e.target.value) }}
            value={note}
            marginTop="10px" minWidth="500px" border="1px" borderColor='gray.300' isReadOnly={Disabled}></Input>
          {/*hidden component start-----------------------------------------------------------------*/}
         {
          searchResult?
          ( 
           
            <Box>
      
            <Box display="flex" >
            <Icon as={AiOutlineLink} boxSize={4} marginRight="5px" />
            <Text fontWeight="bold" > Your Short URL</Text>
          </Box>
          <Input 
            value={searchResult.shortUrl}
            marginTop="10px" minWidth="500px" border="1px" borderColor='gray.300' isReadOnly={Disabled}></Input>
            </Box>
           )
          :(
            console.log("Hello")
          )
         } 
         
          
           {/*hidden component end-----------------------------------------------------------------*/}
          {
            !Disabled?
            ( 
              <Box>
              <Button
              onClick={handleSubmit}
              isLoading={loading}
              colorScheme="green"
              _hover={{ bg: 'green.600' }}
              transition="background-color 0.3s"
              marginTop="10px" minWidth="560px">Shorten Url</Button>
              </Box>        
              )
            :(
              <Box>
              <Box marginTop="10px" display="flex" justifyContent="space-evenly">
              <Tooltip hasArrow label='Visit URL' placement='top' >
              <IconButton icon={<GoLinkExternal />} fontSize='30px' color='green.600' onClick={handleVisit}/>
               </Tooltip>
               <Tooltip hasArrow label='download QR code' placement='top' >
               <QRmodal url={searchResult.Url}>
               <Button leftIcon={<AiOutlineQrcode/>} bgColor='green.600' color ="white" >
                  QR code
               </Button>
               </QRmodal>    
               </Tooltip>
              <Tooltip hasArrow label='Copy to clipboard' placement='top' >
              <Button leftIcon={<AiFillCopy/>} bgColor='green.600' color ="white" onClick={handleCopy}>
              Copy
           </Button>
                
               </Tooltip>
              </Box>
              <Button
              onClick={handleShortenAnother}
              // isLoading={loading}
              colorScheme="green"
              _hover={{ bg: 'green.600' }}
              transition="background-color 0.3s"
              marginTop="10px" minWidth="560px">Shorten another</Button>
              </Box>
             ) 
          }
        </Box>
      </Box>
    </>
  )
}

export default Urlpage;