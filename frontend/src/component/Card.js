import { Box, Button, Link, Text, Textarea, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import autosize from "autosize";
import axios from "axios";
import { UrlState } from "../context/urlProvider";
import Qrcode from 'qrcode';
const Card =({data})=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
const ref = useRef();
useEffect(() => {
    autosize(ref.current);
    return () => {
      autosize.destroy(ref.current);
    };
  }, []);
     const [qr,setqr] = useState();
    const [read,setRead] = useState(true);
    const [Hidden,setHidden] = useState(false);
    const [loading ,setLoading] = useState(false);
    const [newNote,setNewNote] = useState();
    const toast = useToast();
    const handleUpdate=()=>{
       setRead(false);
       setHidden(true);
    }
    const handleUpdateDatbase = async ()=>{
        setRead(true);
        setHidden(false);
        toast({
            title: 'Note Updated Successfully',
            // description: "Enter atleast one matched ch",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top-left"
        })
        setLoading(true);
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const {doc} = await axios.put('/api/search/update', {id:data._id,newNote:newNote},config);
        // console.log(doc);
        setNewNote('');
        setLoading(false);
        
    }
    const generateQRcode=async(short)=>{
        console.log("clicked");
        // setShort(searchResult.shortUrl);
        Qrcode.toDataURL(
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
    const handleclick=()=>{
        generateQRcode(data.shortUrl)
    }
   return(
    <Box
    cursor="pointer"
    bg="#E8E8E8"
    width="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg">
    <Box  width="100%">
        <h3>
        <b>Original Url</b>
        </h3>
        <Link>{data.orgUrl}</Link>   
    </Box>
    <Box  width="100%">
        <h3>
        <b>Short Url</b>
        </h3>
        <Link>{data.shortUrl}</Link>   
    </Box>
    <Box  width="100%" >
        <h3>
        <b>Note</b>
        </h3>
        <Textarea readOnly={read} ref={ref} transition="height none" 
        onChange={(e)=>{
            setNewNote(e.target.value)
        }}
        >{data.note}</Textarea>  
        <Box display="flex" justifyContent={"space-evenly"}>
        <Button bgColor="red" color="white" onClick={handleUpdate} hidden ={Hidden} marginLeft="5px"> Update Note</Button> 
        <Button bgColor="green" color="white" onClick={handleUpdateDatbase}marginLeft="5px" hidden ={!Hidden} isLoading ={loading}> Update</Button>

        <a download href={qr}>
        <Button  bg bgColor="white" variant='outline' onClick={handleclick}> 
        Download QRcode </Button></a>
        </Box>
    </Box>

    </Box>
   )
}
export default Card;