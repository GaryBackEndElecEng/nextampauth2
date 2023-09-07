import {NextApiRequest,NextApiResponse} from "next";
// import { getServerSession } from 'next-auth';
// import  authOptions  from "@component/context/options";
import type {DataType,userType,PostDataType,answerType} from "@component/context/type";
import prisma from "@_prisma/client";

export default async function handle(req:NextApiRequest, res:NextApiResponse) 
{
// const session= await getServerSession(authOptions);

    const body:PostDataType=req.body;
    if(req.method==="PUT" && body){
        try {
            const getBody:PostDataType= await req.body;
            //postId:6, userId:2
            //pull userId from teh session ( next.auth)
            
               const updatePost =await prisma.post.update({
                where:{
                    id:body.id
                },
                data:{
                    id:getBody.id,
                    title:getBody.title,
                    content:getBody.content,
                    published:getBody.published,
                    userId:getBody.userId,
                }
               });
              
              const getAll = await prisma.post.findMany({
                where:{
                  userId:getBody.userId
                }
              });
                res.status(200).json(getAll);
           
          } catch (error) {
            res.status(404).json({message:"did not find your post"})
          }finally{
            await prisma.$disconnect()
          }
    }

}