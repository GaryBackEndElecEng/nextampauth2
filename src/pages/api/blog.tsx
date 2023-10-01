import { NextApiRequest, NextApiResponse } from "next"
import { getSingleFileMdx } from "@lib/blogPosts";
import type { BlogpostDataType } from "@context/blogTypes";


export default async function handleBlog(req: NextApiRequest, res: NextApiResponse) {
    const { file } = req.body;
    if (req.method === "POST" && file) {
        const getFile: BlogpostDataType | undefined = await getSingleFileMdx(file as string);

        if (getFile) {
            return res.status(200).json({ data: getFile })
        } else {
            return res.status(404).json({ message: " file not found" });
        }

    } else {
        return res.status(400).json({ message: "bad request" })
    }

}

