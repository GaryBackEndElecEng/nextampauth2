// import { csrf } from "@/csrf";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") 
    {
        try {
            const users= await prisma.user.findMany({
                include:{
                    posts:true,
                    answers:true
    
                },
            });
            res.status(200).json(users);
            prisma.$disconnect();
        } catch (error) {
            res.status(500).json({message:" server issues pulling records"})
        }
    }
    

}
export default handler