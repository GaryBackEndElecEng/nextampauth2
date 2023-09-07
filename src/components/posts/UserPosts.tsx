"use client"
import React from 'react';
import DisplayPage from "@/components/posts/DisplayPage";
import { useSearchParams } from 'next/navigation';
import { PostDataType, userAccountType,msgType } from "@component/context/type";
import { GeneralContext } from "@component/context/GeneralContextProvider";
import {useSession} from "next-auth/react";
import httpUrl from "@component/context/httpUrl";
import {useRouter} from "next/navigation";
const url=httpUrl();

type userPostsType={
  getUserAccount:userAccountType
}


const UserPosts = ({getUserAccount}:userPostsType) => {
  const router=useRouter();
  // const userId: string | null=params ? params.get("userId") : null;
  const [usersPosts, setUsersPosts] = React.useState<PostDataType[]>([]);
  const { account, setAccount,setIsSignin, setMsg,msg,setGenMsg,genMsg,allPosts } = React.useContext(GeneralContext);
  const [msg2,setMsg2]=React.useState<msgType>({loaded:false,msg:""})
  const getUserId =(account && account.loaded && account.data) ? account.data.id : null;

  React.useEffect(()=>{
    setAccount(getUserAccount);
    setUsersPosts(allPosts.filter(post=>(post.userId===getUserId)));
  },[getUserAccount,setUsersPosts,setAccount,getUserId,allPosts]);

    const handleReturn=(e:React.MouseEvent)=>{
      e.preventDefault();
      router.push("/dashboard");
    };

  return (
    <div className="mx-0 lg:mx-auto lg:container flex flex-col items-center w-full ">
      <div className="flex flex-col my-3 mx-auto items-center">
             
                <button className="px-3 py-1 shadow shadow-blue-600 rounded-md" onClick={(e)=>handleReturn(e)}>
                  return
                </button>
                
            </div>
      <div className="flex flex-col items-center justify-center">
        {genMsg.loaded ?
      <div className="text-lg text-blue-500 my-2">
        {genMsg.msg}
        <span> {msg2.loaded && msg2.msg}</span>
      </div>  
      :
      <div className="text-lg text-red-500 my-2">
        {genMsg.msg}
      </div>
      }
      </div>
      {account && account.data && account?.data.status==="authenticated" &&
      <DisplayPage
       usersPosts={usersPosts}
       setUsersPosts={setUsersPosts}
       userId={ account.data.id}
       />
       }
    </div>
  )
}

export default UserPosts