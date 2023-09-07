import { csrf } from "@/csrf";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") 
    {
        try {
            return res.status(200).json({ message: `This Api route is protected => ${req.body}` })
        } catch (error) {
            return res.status(400).json({ message: " did not get- server issue" })
        }
    }
    

}
export default csrf(handler)