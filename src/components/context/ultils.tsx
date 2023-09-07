import bcrypt from "bcryptjs";
import type {userTypeNoAcc,DataType,userAccountType,PostDataType,testPosts, userInfoType} from "@component/context/type";
import {getServerSession} from "next-auth";
import authOptions from "@component/context/options";
import httpUrl from "@component/context/httpUrl";
import prisma from "@_prisma/client";

const url=httpUrl();
const logo=`${process.env.NEXT_PUBLIC_aws_static}/logo.png`;

export async function genHash(pswd:string){
  "use server"
  let salt=bcrypt.genSaltSync(8);
  return bcrypt.hashSync(pswd,salt)
}
export async function compToHash(pswd:string,hash:string){
  var comp=bcrypt.compare(pswd,hash);
  return comp
}


export async function getAccount():Promise<userAccountType | undefined>{
  "use server"
  const session= await getServerSession(authOptions);
  if(session && session.user?.email){
  const user= await prisma.user.findUnique({
    where:{
        email:session.user.email
    }
  });
  try {
    if(user){
      const userBody:userAccountType={
        loaded:true,
        data:{
          id:user.id,
          name:user.name as string,
          email:user.email as string,
          image:user.image as string,
          status:"authenticated"
        }
      }
      return userBody
    }
  } catch (error) {
    console.error(error)
  }finally{
    prisma.$disconnect()
  }
  }
}
export async function getAllposts():Promise<PostDataType[] | null>{
    try{
      const publishedPosts:PostDataType[] | null=await prisma.post.findMany({
        where:{
          published:true
        },
        include:{
          answers:true
        }
      }) as PostDataType[];
      
      return publishedPosts
    }catch(e){
      console.error(e);
      return null
    }finally{
      await prisma.$disconnect()
    }
    
}
export async function isAdmin():Promise<boolean>{
  const session=await getServerSession(authOptions)
  
  const adminemail=process.env.NEXT_PUBLIC_adminemail
  const adminuser=process.env.NEXT_PUBLIC_adminuser
  const check=(session?.user?.email===adminemail && session?.user?.name===adminuser) ? true : false
  return check
}
export async function getImg():Promise<string>{
  const session=await getServerSession(authOptions);
  if(session?.user?.image){
    return session?.user?.image
  }else{
    return logo
  }
}
export async function setCSRF():Promise<boolean>{
  const url = httpUrl();
  const options={
    method:"GET",
    headers:{
        "Accept":"application/json , XSRF-TOKEN",
        "Content-Type":"application/json"
    }
}
const res = await fetch(`${url}/api/posts/gencsrf`,options);
  if(!res.ok){
      const body:{message:string}= await res.json();
      console.error(body)
      return false
  }
  return true
}

export async function getAllusers(){
  "use server"
  const users= await prisma.user.findMany({
    include:{
      posts:true,
      answers:true,
    }
  });
  try{
    return users
  }catch(e){
    console.error(e)
    return []
  }finally{
    await prisma.$disconnect()
  }
}

export async function countUsers(){
  try {
    const count=await prisma.user.count({});
    return count
  } catch (e) {
    console.error(e)
  }finally{
    prisma.$disconnect()
  }
  
  
}
export async function getUserPosts(){
  "use server"
  const account=await getAccount();
    if(account && account.loaded && account.data)
    {
      const posts= await prisma.post.findMany({
        where:{
            userId:account.data.id
        },
        include:{
          answers:true
        }
      });
      try {
        if(posts){
          return posts
          }else return null
          
        } catch (error) {
        console.error(error)
        return null
      }finally{
        prisma.$disconnect()
      }
    }
}
export async function getUsersInfo(){
  "use server"
  
  try{
    const users: userInfoType[] | null= await prisma.user.findMany() as userInfoType[];
    return users
  }catch(e){
    console.error(e)
    return null
  }finally{
    await prisma.$disconnect()
  }
}
