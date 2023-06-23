import React, { useState } from "react";
import { Button, Img } from "@chakra-ui/react";
import { UrlState } from "../context/urlProvider";
const Qrcode = ()=>{
    const {qr,setqr} =UrlState();
   return (
    <>
    
        {
            qr?
            (
                 <Img src={qr}/>
            )
            :(console.log("hello1"))
        }
    </>
   )
}
export default Qrcode;