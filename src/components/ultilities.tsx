"use client"
import React from 'react';
import {signIn,signOut} from "next-auth/react";
import {redirect,useRouter} from "next/navigation";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {GeneralContext} from "@component/context/GeneralContextProvider";
import {IconButton} from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export function convertDate(date:Date){
    if(date){
    let newDate=new Date(date);
    return newDate.toLocaleDateString()
    }
}
export  const CombineButtons=()=>{
    const { session}=React.useContext(GeneralContext);
    if(session){
        return(
                <LogoutButton/>
        )
    }else{
        return(
            <div className="inline-flex">
            <LoginButton/>
            <RegisterButton/>
            </div>
        )
    }

   
}
export const LoginButton=()=>{
    
    return (
        <div className="flex flex-col my-2 mx-1 h-[90%] group relative">
        <IconButton className="m-auto border border-black-500 rounded-lg text-xs bg-black text-white shadow-md px-2 py-1 shadow-white bg-white hover:shadow-lg " onClick={()=>signIn()} style={{background:"white"}}>
           <LoginIcon sx={{color:"red"}}/>
        </IconButton>
        <div className="absolute top-30 -left-[150%] hidden  group-hover:block text-green bg-white p-1 rounded-md">login</div>
        </div>
    )
}

export const Logout=()=>{
    const {setSignin,setIsSignin,setAccount,session,status}=React.useContext(GeneralContext);
    const handleSignout=(e:React.MouseEvent)=>{
        e.preventDefault();
        setSignin(false);
        localStorage.removeItem("account");
        setIsSignin(false);
        setAccount({loaded:false,data:null});
        return signOut()
        
    }
    return(
        <div className="relative flex flex-col items-center my-2 mx-1 group relative ">
           
        <button className="m-auto p-1  rounded-lg  text-sm bg-black-300 text-black bg-white shadow-md shadow-green inline-flex " onClick={(e)=>handleSignout(e)}>
            <LogoutIcon sx={{color:"red"}}/>
        {session?.user?.image && <Image src={session.user.image} width={30} height={30} alt="www.masterconnect.ca" className="rounded-[50%] bg-none"/>}
        </button>
        {session?.user?.name && <div className="text-xs bg-white p-1 rounded-md">{session.user.name.split(" ")[0]}</div>}
        <div className="absolute top-30 -left-[150%] hidden group-hover:block text-green bg-white p-1 rounded-md">log out</div>
        </div>
    )
}

export const LogoutButton=()=>{
    
    return(
        
            <Logout/>
        
    )
}
export const RegisterButton=()=>{
    const router=useRouter();
    
    
    return(
    <div className="flex flex-col  mx-1 my-2 group relative">
        <IconButton className="m-auto p-1 border border-black rounded-lg  text-xs bg-white text-white shadow-md shadow-white hover:shadow-lg " onClick={()=>router.push("/register")} style={{background:"white"}}>
            <HowToRegIcon sx={{color:"red"}} />
        </IconButton>
        <div className="absolute top-30 -left-[350%] hidden group-hover:block text-green bg-white p-1 rounded-md">
            <InsertEmoticonIcon sx={{color:"red",mr:1}}/>
            register
        </div>
        
        </div>
    )
}