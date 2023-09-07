"use client"
import React from 'react';
import MainAdmin from "@component/admin/MainAdmin";
import {getServerSession} from "next-auth";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
// import {getCsrfToken} from "next-auth/react";
import type {userType,msgType,adminType} from "@component/context/type";
import {GeneralContext} from "@component/context/GeneralContextProvider";

const AdminPage = () => {
    const {data:session,status}= useSession();
    const {allUsers,setAllUsers}=React.useContext(GeneralContext);
    const adminemail=process.env.NEXT_PUBLIC_adminemail;
    const adminUser=process.env.NEXT_PUBLIC_adminuser;
    const [check,setCheck]=React.useState<boolean>(true);
    const [msg,setMsg]=React.useState<msgType>({loaded:false,msg:""});
    const [data,setdata]=React.useState<userType[]>([]);
    const [adminData,setAdminData]=React.useState<adminType>({name:"",email:""});
    
    
    React.useMemo( async()=>{
        
        if(session && session.user && session.user.email && session.user.name){
            const getCheck:boolean=((adminemail===session.user.email) && (adminUser===session.user.name)) ? true:false
            setCheck(getCheck)
            setAdminData({name:session.user.name,email:session.user.email})
            
        }else{
            setMsg({loaded:false,msg:"email did not match"})
        }
        
    },[session,adminemail,adminUser,setCheck]);

    React.useEffect(()=>{
    
        const getUsers=async()=>{
            const options={
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(adminData)
            }
            
                const res= await fetch("/api/posts/admin",options);
                if(!res.ok){
                    const body= await res.json()
                    setMsg({loaded:false,msg:body.message})
                }
                const body: userType[]= await res.json();
                let tempBody:userType[]=body.filter(user=>(user.email !==adminemail))
                setAllUsers(tempBody);
        }
        if(check && adminData &&  adminemail){
            getUsers();
        }
    },[check,adminData,setAllUsers,adminemail]);



if(status === "authenticated" && check){
        if( session){
            return (
                <div className="lg:container lg:mx-auto w-full mt-20 mx-0 px-1">
                    
                    <MainAdmin session={session} />
                </div>
            )
        }else{
            return(<div>Sorry did not connect account issues</div>
                )
        }
}else{
    return(<div>You are not authorized</div>)
}
  
}

export default AdminPage