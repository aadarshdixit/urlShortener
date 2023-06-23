import { useDisclosure } from '@chakra-ui/hooks';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import axios from "axios";
import LoadingState from './loadingState';
import UrlItems from './UrlItems';
import Message from './Message';
import ProfileModel from '../Modal/ProfileModal';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { UrlState } from '../context/urlProvider';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import CardModal from '../Modal/CardModal';
const SideBar = () => {
   const [user,setUser] =useState();
    const [searchUrl, setSearchUrl] = useState();
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isToggle, setisToggle] = useState();
    const [loading, setLoading] = useState(false);
    const [allUrl, setAllUrl] = useState();
    const toast = useToast();
    const id = 'test-toast'
    console.log(user);
    useEffect(() => {
        if (!isOpen) {
            setSearchUrl("");
            // setAllUrl("")
        }
    }, [isOpen])
    useEffect(() => {
        if (searchUrl === "") {
            setisToggle(false);
        }
        else {
            setisToggle(true);
            searchHandler();
        }
    }, [searchUrl])
    useEffect(()=>{
        var x = JSON.parse(localStorage.getItem("userInfo"));
        setUser(x)
     },[])
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }

    const searchHandler = async () => {
        setLoading(true);
        if (!searchUrl) {
            console.log("heloo");
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Fatal Error',
                    description: "Enter atleast one matched ch",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: "top-left"
                })
            }
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/search?key=${searchUrl}`,config);
            setAllUrl(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    const handleInput = (e) => {
        setSearchUrl(e.target.value);
    }
    return (
        <>
            <Box
                display="flex" justifyContent="space-between" paddingInline="20px" padding="5px" backgroundColor="gray.100">
                <Tooltip hasArrow label='Search your Urls' placement='bottom-end' >
                    <Button leftIcon={<AiOutlineSearch />} variant='ghost'  fontSize="20px" ref={btnRef} colorScheme='teal' onClick={onOpen}>
                        Search
                    </Button>

                </Tooltip>
                <Text color='blue' fontSize='3xl'> Url Shortener </Text>

                <div>
                <Menu>
                    <MenuButton>
                        <BellIcon fontSize="3x1" m={1} w={8} h={8} />
                    </MenuButton>
                </Menu>
                {user && <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} fontSize="20px">
                        <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} >
                        </Avatar>
                    </MenuButton>
                    <MenuList>
                        <ProfileModel user={user}>
                            <MenuItem >My Profile</MenuItem>
                        </ProfileModel>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>}
            </div>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader backgroundColor="gray.100" >Search Url</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex " justifyContent="space-evenly" marginBottom={"5px"} >
                            <Input placeholder="enter the anything related to Url"
                                value={searchUrl}
                                onChange={handleInput}
                            />
                            <Button marginLeft="15px" onClick={searchHandler}>Search</Button>
                        </Box>

                        {
                            isToggle && <Box>
                                {
                                    loading ?
                                        (<LoadingState />)
                                        : (
                                            <Box>
                                                {  
                                                  ( allUrl && allUrl.length)?
                                                    (
                                                        allUrl.map((e) => {
                                                            return (
                                                                <CardModal data = {e}>
                                                                <UrlItems data={e} />
                                                                </CardModal>
                                                               
                                                                
                                                            )
                                                        })
                                                    )
                                                 :(
                                                        <Message/>
                                                    )
                                                    
                                                }
                                            </Box>

                                        )
                                }
                            </Box>

                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideBar;