import {getServerSession} from "next-auth";
import authOptions from "@context/options";
import All_Posts from "@/components/posts/All_Posts";
import type {Metadata} from 'next';
import {metaposts} from "@component/metadata/metaposts";
import {isAdmin,getAccount,getImg,getAllposts} from "@component/context/ultils";
export const metadata:Metadata=metaposts;
const logo = `${process.env.NEXT_PUBLIC_aws_static}/logo.png`
import type {PostDataType} from "@component/context/type";

export default async function Posts() {
  const check= await isAdmin();
  const imgSrc= await getImg();
  const getAllPosts:PostDataType[]|null= await getAllposts();
  // const allposts=await getAllposts();
  // const isCSRF= await setCSRF();
  const account = await getAccount();
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mt-12 ">

   <div className="flex flex-col items-center justify-center">
    
    <div className="flex flex-row flex-wrap gap-5 items-center justify-center my-3 mx-auto">
      
      <a href={"/dashboard"} className="m-auto shado shadow-blu-600 rounded-lg px-4 py-2">
        <button className="border blue m-auto p-2"> dashboard</button>
      </a>
      {check && <a href={"/admin"} className="m-auto shado shadow-blu-600 rounded-lg px-4 py-2">
        <button className="border blue m-auto p-2"> admin</button>
      </a>}
    </div>
   </div>
   <All_Posts 
   getAccount={account}
   imgSrc={imgSrc }
   />
    </main>
  )
}