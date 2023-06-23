import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
const urlContext = createContext();

const UrlProvider = ({children})=>{

    const [user,setUser] = useState();
    const [qr,setqr] = useState()
    const [orgUrl, setorgUrl] = useState();
    const [short, setShort] = useState();
    const [searchResult,setSearchResult] =useState();

    
    useEffect(()=>{
        var x = JSON.parse(localStorage.getItem("userInfo"));
        setUser(x);
        console.log(x);
     },[])

   return <urlContext.Provider value ={{user,setUser,orgUrl, setorgUrl,short,setShort,searchResult,setSearchResult,qr,setqr}}>{children}</urlContext.Provider>
};

export const UrlState = ()=>{
    return useContext(urlContext);
}

export default UrlProvider;