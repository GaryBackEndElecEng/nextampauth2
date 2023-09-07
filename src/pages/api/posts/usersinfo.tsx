import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") 
    {
        try {
            const usersInfo= await prisma.user.findMany();
            res.status(200).json(usersInfo);
            prisma.$disconnect();
        } catch (error) {
            res.status(500).json({message:" server issues pulling records"})
        }finally{
            await prisma.$disconnect()
        }
    }
    

}
export default handler