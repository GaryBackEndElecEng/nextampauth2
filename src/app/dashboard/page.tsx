

import UserPosts from "@component/posts/UserPosts";
import {getUserPosts,getAccount} from "@component/context/ultils";
import type { userAccountType} from "@component/context/type";
import { redirect } from 'next/navigation';


const Dashboard = async() => {
      const getUserAccount: userAccountType= await getAccount() as userAccountType;
      if(getUserAccount.data?.status==="authenticated"){
    return(
     
        <div className="flex flex-col py-10 px-1 lg:mx-auto lg:container ">
            <h3 className="text-center text-xl m-auto">Protected</h3>
           <UserPosts
            getUserAccount={getUserAccount}
           />
        </div>
        
    )
      }else{
        redirect("/api/auth/signin")
      }
  }


export default Dashboard