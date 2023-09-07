import React from 'react';
import type { userType,adminDeleteUserType,msgType} from "@context/type";
import {GeneralContext} from "@context/GeneralContextProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {getCsrfToken} from "next-auth/react";

type maindeleteType={
user:userType,
adminuser:string | null | undefined,
adminemail:string | null | undefined
}
const DeleteUser = ({user,adminuser,adminemail}:maindeleteType) => {
    const { allUsers,setAllUsers}=React.useContext(GeneralContext);
    const [msg,setMsg]=React.useState<msgType>({loaded:false,msg:""})

    const handleDeleteUser= async(e:React.MouseEvent,id:string)=>{
        const csrfToken= await getCsrfToken();
        if(adminuser && adminemail && id)
        {
            const body:adminDeleteUserType={userId:id,name:adminuser,email:adminemail}
            const options={
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "X-CSRF-Token":`${csrfToken}`
                },
                body:JSON.stringify(body)
            }
            const res= await fetch(`/api/posts/admindeleteuser`,options);
            if(!res.ok){
                setMsg({loaded:false,msg:"did not delete"});
            }else{
            const body_:userType=await res.json()
            setMsg({loaded:true,msg:`user ${body_.name} deleted`});
            setAllUsers(allUsers.filter(user_=>(user_.id !==body_.id)))
            }
        }
    }
  return (
    <div className="flex flex-col items-center justify-center">
        {msg.loaded ?
        <div className="text-lg text-blue text-center">{msg.msg}</div>
        :
        <div className="text-lg text-red text-center">{msg.msg}</div>    
        }
    <div className="flex flex-row flex-wrap items-center justify-center">
        <h3 className="text-center text-sm underline underline-offset-8"> del {user.name?.split(" ")[0]}?</h3>
        <IconButton onClick={(e)=>handleDeleteUser(e,user.id)}>
            <DeleteIcon sx={{m:2,color:"red"}}/>
        </IconButton>
    </div>
    </div>
  )
}

export default DeleteUser