import type {NextApiRequest,NextApiResponse} from 'next';
import prisma from "@_prisma/client";
import type {DataType,userType,answerType_2} from "@component/context/type";
import {getServerSession} from "next-auth";
import authOptions from "@component/context/options";

type messageType={
  message:string
}


export default async function handle(req:NextApiRequest, res:NextApiResponse<any>) 
{
    
    
    if(req.method=="POST"){
        const body:answerType_2=req.body
        if(body.answer && body.userId && body.postId)
        {
            const {answer,postId,userId}=body;
            try {
                
                const data= await prisma.answer.create({
                    data:{
                        answer:answer,
                        userId:userId,
                        postId:postId
                    }
                });
                res.status(200).json(data)
            } catch (error) {
                res.status(500).json({message:" server error"})
            }finally{
                await prisma.$disconnect()
            }
        }else{
            res.status(404).json({message:" data was not recieved"})
        }
    }


}