import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";
const isProd: boolean = process.env.NODE_ENV == "production" ? true : false;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const page: string = req.body
    if (!isProd) return res.status(200).json({ message: "success" })
    if (req.method === "POST" && page) {
        try {
            const getPage = await prisma.pageHit.upsert({
                where: {
                    page: page
                },
                update: {},
                create: {
                    page: page as string,
                    count: 1
                }
            });

            if (getPage && getPage.page && getPage.count) {
                const Page = await prisma.pageHit.update({
                    where: {
                        page: getPage.page,
                    },
                    data: {
                        count: getPage.count + 1
                    }
                });

                await prisma.$disconnect();
                res.status(200).json({ message: "success" })
            } else {
                return false
            }
        } catch (error) {
            await prisma.$disconnect();
            res.status(500).json({ message: "NOT RECORDED" })
        }

    } else {
        res.status(400).json({ message: "bad request" })
    }
}