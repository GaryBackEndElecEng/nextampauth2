"use client";
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import type {PostDataType,deleteType,msgType,userType,answerType} from "@component/context/type";
import {getCsrfToken} from "next-auth/react";
import {GeneralContext} from "@component/context/GeneralContextProvider";
 const adminemail=process.env.NEXT_PUBLIC_adminemail;
 const adminuser=process.env.NEXT_PUBLIC_adminuser;


type mainDeleteType={
    post:PostDataType,
}


const DeleteUpdate = ({post}:mainDeleteType) => {
    const {allUsers,setAllUsers}=React.useContext(GeneralContext);
    const [deleteThis,setDeleteThis]=React.useState<boolean>(false);
    const [publish,setPublish]=React.useState<boolean>(false);
    const [ msg,setMsg]=React.useState<msgType>({loaded:false,msg:""});

    const handleDelete= async (e:React.FormEvent<HTMLFormElement>,post:PostDataType)=>{
        e.preventDefault();
        const csrfToken= await getCsrfToken();
        if(post){
            const del: deleteType={
                loaded:true,
                postId:post.id,
                userId:post.userId,
                published:publish,
                deleteThis:deleteThis,
                adminuser:adminuser,
                adminemail:adminemail
                }
                const options={
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "X-CSRF-Token":`${csrfToken}`
                        
                    },
                    body:JSON.stringify(del)
                }
                const res= await fetch("/api/posts/admin-del-update",options);
                if(!res.ok){
                    if(!(res.status ===500)){
                    setMsg({loaded:false,msg:"not 500 but something"})
                    }else{
                        setMsg({loaded:false,msg:" server error"})
                    }
                }
                const body: PostDataType= await res.json() as PostDataType;
                if(deleteThis){
                    let user: userType=allUsers.filter(user=>(user.id ===body.userId))[0]
                    let remainingPosts:PostDataType[]=user.posts.filter(post=>(post.id !==body.id));
                    let remainingAns:answerType[]=user.answers.filter(ans=>(ans.postId !==body.id))
                    let combinedUser:userType={
                        id:user.id,
                        name:user?.name,
                        email:user?.email,
                        image:user?.image,
                        emailVerified:user?.emailVerified,
                        accounts:user.accounts,
                        password:user.password,
                        posts:remainingPosts,
                        answers:remainingAns
                    }
                    let rmveUsers:userType[]=allUsers.filter(user=>(user.id !==body.userId))
                    setAllUsers([...rmveUsers,combinedUser])
                }
                setMsg({loaded:true,msg:`${body.title} was ${del.deleteThis ? "deleted" : " updated"}`});
        }
    };

  return (
    <div className="flex flex-col items-center mx-0">
{ post &&
        <div>
            {
            msg.loaded ? 
            <div className="flex flex-col items-center">
                <div className="text-lg text-center text-blue">
                    {msg.msg}
                </div>
            </div>
            :
            <div className="flex flex-col items-center">
                <div className="text-lg text-center text-red">
                    {msg.msg}
                </div>
            </div>
            }
            <form action="" className="flex flex-col items-center"
            onSubmit={(e)=>handleDelete(e,post)}
            >
                <div className="text-xl font-bold text-center my-2">Delete</div>
                <input
                id="delete"
                type="checkbox"
                checked={deleteThis}
                onChange={(e)=>setDeleteThis(e.target.checked)}
                />
                <div className="text-xl font-bold text-center my-2">publish</div>
                <input
                id="publish"
                type="checkbox"
                checked={publish}
                onChange={(e)=>setPublish(e.target.checked)}
                />

            <div className="flex flex-col items-center my-2">
                <button className="px-3 py-1 shadow-md shadow-blue text-black bg-white border border-blue" type="submit">submit</button>
            </div>
            </form>
        </div>
        }
    </div>
  )
}

export default DeleteUpdate