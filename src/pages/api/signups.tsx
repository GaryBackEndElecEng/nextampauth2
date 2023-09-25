
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";

const name = process.env.NEXT_PUBLIC_adminuser
const email = process.env.NEXT_PUBLIC_adminemail

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    console.log(body)
    if (req.method === "POST" && body) {
        const check: boolean = (body && body.name === name && body.email === email) ? true : false;
        console.log(check)
        if (check) {
            try {
                const signups = await prisma.signup.findMany();
                res.status(200).json(signups);
                await prisma.$disconnect();
            } catch (error) {
                res.status(500).json({ message: "something is wrong- could not get signups" })
            }
        } else {
            res.status(400).json({ message: " name and email did not match" })
        }
    } else {
        res.status(400).json({ message: "counld not find" })
    }
}