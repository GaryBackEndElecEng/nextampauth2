
"use client"
import React from 'react';
import {useSession} from "next-auth/react";

const ClienSideProtect = () => {
    const {status}=useSession({
        required:true,
        onUnauthenticated() {
            
        },
    })
  if(status==="loading"){
    return(
        <div className="flex flex-col p-10 mx-auto container">
            <h3 className="text-center text-lg m-auto">NOT LOGGED IN</h3>
        </div>
    )
  }else{
    return(
        <div className="flex flex-col p-10 mx-auto container">
            <h3 className="text-center text-xl m-auto">This is the page</h3>
        </div>
    )
  }
}

export default ClienSideProtect