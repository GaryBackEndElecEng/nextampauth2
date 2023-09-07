import type {NextApiRequest,NextApiResponse} from 'next';
import prisma from "@_prisma/client";
import {DataType,userType} from "@component/context/type";
import {convert} from "./posts";
// import {csrf} from "@/csrf";


const usersposts =async (req:NextApiRequest,res:NextApiResponse) => {
  const {userId}=req.query
  const getUserId=convert(userId);
  
  if(getUserId )
  {
    try {
        const posts = await prisma.post.findMany({
            where:{
                userId:getUserId
            },
            include:{
              answers:true
            }
        });
        
        res.status(200).json(posts)
        prisma.$disconnect()
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
  }

}

export default usersposts