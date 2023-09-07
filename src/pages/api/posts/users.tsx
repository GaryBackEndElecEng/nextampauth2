import {NextApiRequest,NextApiResponse} from "next";
import type {userType,userAccountType} from "@component/context/type";
import prisma from "@_prisma/client";
// import {csrf} from "@/csrf";


 async function handle(
    req:NextApiRequest,
    res:NextApiResponse
    )
{
    const body=req.body;
    const {name,email,password}=body;
    

     if(req.method ==="POST" && body)
     {
        
        try {
            const user= await prisma.user.findUnique({
                where:{
                    email:body
                }
            });
            if(!user){
                res.status(400).json({message:`there is no user of type email:${email}`})
            }else if(user && user.name && user.email){
            const userAccount:userAccountType={
                loaded:true,
                data:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    image:user?.image as string,
                    status:"authenticated"
                }
            }
            res.status(200).json(userAccount)
            }
            
            prisma.$disconnect();
        } catch (error) {
            res.status(500).json({message:"server error- try later"})
        }
     }
     

}
export default handle