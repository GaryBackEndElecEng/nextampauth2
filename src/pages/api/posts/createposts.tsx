import type {NextApiRequest,NextApiResponse} from 'next';
import prisma from "@_prisma/client";
import type {PostDataType} from "@component/context/type";
import {getServerSession} from "next-auth";
import authOptions from "@component/context/options";

export default async function handle(req:NextApiRequest, res:NextApiResponse<any>) 
{
// const session= await getServerSession(authOptions);
const body=req.body;
const {title,content,published,userId}=body;


    if(req.method==="POST" ){
        try {
            const getUserId= await prisma.user.findUnique({
                where:{
                    id:userId
                }
            });
           
            if(getUserId && body){
                
                const createPost= await prisma.post.create({
                    data:{
                        ...body
                    }
                    
                });
                
                res.status(200).json(createPost)
            }else{
                res.status(400).json({message:`did not create,either missing info ${JSON.stringify(req.body)} or no user associated`})
            }
            prisma.$disconnect();
        } catch (error) {
            res.status(500).json({message:"server issue at create post"})
        }
    }
}