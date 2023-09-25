import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";

const name = process.env.NEXT_PUBLIC_adminuser
const email = process.env.NEXT_PUBLIC_adminemail

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;

    if (req.method === "POST" && body) {
        const check: boolean = (body && body.name === name && body.email === email) ? true : false;

        if (check) {
            try {
                const pageHits = await prisma.pageHit.findMany();
                res.status(200).json(pageHits);
                await prisma.$disconnect();
            } catch (error) {
                res.status(500).json({ message: "something is wrong- could not get pageHits" })
            }
        } else {
            res.status(400).json({ message: " name and email did not match" })
        }
    } else {
        res.status(400).json({ message: "counld not find" })
    }
}