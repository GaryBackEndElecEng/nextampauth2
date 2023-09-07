import {NextApiRequest,NextApiResponse} from "next";
import type {userType,deleteType} from "@component/context/type";
import prisma from "@_prisma/client";

export default async function handle(
    req:NextApiRequest,
    res:NextApiResponse
    )
{
    const body=req.body;
    const {name,email,postId,userId,deleteThis,published}=body;
    

    const adminuser=process.env.NEXT_PUBLIC_adminuser;
    const adminemail=process.env.NEXT_PUBLIC_adminemail;
    const check:boolean=(adminemail===email && adminuser===name) ? true: false;
    if (req.method==="POST" && check)
    {
            if( !postId && !userId)
            {
            try {
                const getAccounts= await prisma.user.findMany({
                    include:{
                        posts:true,
                        answers:true
                    }
                });
                res.status(200).json(getAccounts);
            } catch (error) {
                res.status(500).json({message:"server error on findMany"})
            }finally{
                await prisma.$disconnect()
            }
        }
        else if(postId && userId && deleteThis)
        {
            try {
                const getDeleted= await prisma.post.delete({
                    where:{
                        id:postId
                    }
                });
                res.status(200).json(getDeleted);
            } catch (error) {
                res.status(500).json({message:"server error on delete"})
            }finally{
                await prisma.$disconnect();
            }
        }
        else if(postId && userId && !deleteThis)
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
                await prisma.$disconnect();
            }
        }
        
        
    }
}