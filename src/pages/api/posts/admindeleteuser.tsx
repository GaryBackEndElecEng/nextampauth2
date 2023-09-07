import {NextApiRequest,NextApiResponse} from "next";
import type {adminDeleteUserType} from "@component/context/type";
import prisma from "@_prisma/client";

export default async function handle(
    req:NextApiRequest,
    res:NextApiResponse
    )
{
    const body:adminDeleteUserType=req.body;
    const {name,email,userId}=body;
    

    const adminuser=process.env.NEXT_PUBLIC_adminuser;
    const adminemail=process.env.NEXT_PUBLIC_adminemail;
    const check:boolean=(adminemail===email && adminuser===name) ? true: false;
    if(req.method==="POST" && check)
    {
        try {
            const user= await prisma.user.delete({
                where:{
                    id:userId
                }
            });
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message:"did not find"})
            }
        } catch (error) {
            res.status(500).json({message:"server error@ admindelete"})
        }finally{
            await prisma.$disconnect()
        }
        
    }

}