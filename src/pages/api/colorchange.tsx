import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@_prisma/client";

export class ColorChange {
    color: string;
    constructor(color: string) {
        this.color = color;
    }
    get getColor() {
        return this.color;
    }

}
export let newColor: ColorChange;

export default async function handle(req: NextRequest, res: NextApiResponse) {
    if (!(req.method === "POST" && req.body)) {
        return res.status(400).json({ message: "bad request" })
    }
    const body = req.body;
    const color = body as unknown as { color: string };

    if (color && color.color) {
        const getColor = await prisma.colorSheme.upsert({
            where: {
                color: color.color
            },
            update: {},
            create: {
                color: color.color
            }
        });
        res.status(200).json(getColor);
        await prisma.$disconnect()
    } else {

        res.status(200).json({ color: "light" });
    }


}