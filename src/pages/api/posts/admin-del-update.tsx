import {NextApiRequest,NextApiResponse} from "next";
import type {userType,deleteType} from "@component/context/type";
import prisma from "@_prisma/client";

export default async function handle(
    req:NextApiRequest,
    res:NextApiResponse
    )
{
    const body=req.body;
    const {adminuser,adminemail,postId,userId,deleteThis,published,loaded}=body;

    const adminname=process.env.NEXT_PUBLIC_adminuser;
    const email=process.env.NEXT_PUBLIC_adminemail;
    const check:boolean=(adminemail===email && adminuser===adminname) ? true: false;
    if (req.method==="POST" && check)
    {
        
         if(deleteThis && loaded)
        {
        
            try {
                
                const getDeleted= await prisma.post.delete({
                    where:{
                        id:postId
                    },
                    include:{
                        answers:true
                    }
                });
                
                res.status(200).json(getDeleted);
            } catch (error) {
                res.status(500).json({message:"server error on delete"})
            }finally{
                await prisma.$disconnect()
            }
        }
        else if(!deleteThis && published && loaded)
        {
            
            try {
                const getUpdate= await prisma.post.update({
                    where:{
                        id:postId
                    },
                    data:{
                        published:published
                    },
                
                });
                res.status(200).json(getUpdate);
                
            } catch (error) {
                res.status(500).json({message:"server error on update"})
            }finally{
                await prisma.$disconnect()
            }
        }else{
            await prisma.$disconnect()
            res.status(400).json({message:"nothing happened"})
        }
        
        
    }
}