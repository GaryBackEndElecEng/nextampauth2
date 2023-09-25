"use client"
import React from 'react';
import DisplayPage from "@/components/posts/DisplayPage";
import { useSearchParams } from 'next/navigation';
import { PostDataType, userAccountType, msgType } from "@component/context/type";
import { GeneralContext } from "@component/context/GeneralContextProvider";
import { useSession } from "next-auth/react";
import httpUrl from "@component/context/httpUrl";
import { useRouter } from "next/navigation";
import { ThemeContext } from '../context/ThemeContext';
const url = httpUrl();

type userPostsType = {
  getUserAccount: userAccountType
}


const UserPosts = ({ getUserAccount }: userPostsType) => {
  const router = useRouter();
  const { theme } = React.useContext(ThemeContext);
  const [usersPosts, setUsersPosts] = React.useState<PostDataType[]>([]);
  const { account, setAccount, setIsSignin, setMsg, msg, setGenMsg, genMsg, allPosts } = React.useContext(GeneralContext);
  const [msg2, setMsg2] = React.useState<msgType>({ loaded: false, msg: "" })
  const getUserId = (account && account.loaded && account.data) ? account.data.id : null;

  React.useEffect(() => {
    if (getUserAccount) {
      setAccount(getUserAccount);
      setUsersPosts(allPosts.filter(post => (post.userId === getUserId)));
      setMsg2({ loaded: true, msg: "your posts to edit/create" });
    } else {
      setMsg2({ loaded: false, msg: "you are not logged into your account" });
    }
  }, [getUserAccount, setUsersPosts, setAccount, getUserId, allPosts]);

  const handleReturn = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/posts");
  };

  return (
    <div className={`${theme} mx-0 lg:mx-auto lg:container flex flex-col items-center w-full dark:bg-black bg-[whitesmoke] `}>
      {msg2.loaded ?
        <div className="flex flex-col  items-center justify-center px-10 py-2">
          <h3 className="text text-blue">{msg2.msg}</h3>
        </div>
        :
        <div className="flex flex-col  items-center justify-center px-10 py-2">
          <h3 className="text text-red">{msg2.msg}</h3>
        </div>
      }
      <div className="flex flex-col my-3 mx-auto items-center">

        <button className="px-3 py-1 shadow shadow-blue-600 rounded-md" onClick={(e) => handleReturn(e)}>
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
      {account && account.data && account?.data.status === "authenticated" &&
        <DisplayPage
          usersPosts={usersPosts}
          setUsersPosts={setUsersPosts}
          userId={account.data.id}
        />
      }
    </div>
  )
}

export default UserPosts