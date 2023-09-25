import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { PostDataType } from "@context/type";

const Bucket = process.env._AWS_BUCKET_IMAGE_NAME as string;
const region = process.env._AWS_BUCKET_REGION as string;
const accessKeyId = process.env._AWS_ACCESS_KEY as string;
const secretAccessKey = process.env._AWS_ACCESS_SECRET as string;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const params = req.query;
    const id = params.id;
    if (id) {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id as string)
            },
            include: {
                answers: true
            }
        });

        if (post) {
            let newPost = post as PostDataType;
            const params = {
                Bucket,
                Key: `${post.imageKey as string}`,
                // ContentType:formdata.mimetype
            }
            const command = new GetObjectCommand(params);
            newPost.imageKey = await getSignedUrl(s3, command, { expiresIn: 3600 });

            res.status(200).json(newPost);
        } else {
            res.status(404).json({ message: "could not find post" })
        }

    } else {
        res.status(404).json({ message: "did not get ID" })
    }
    await prisma.$disconnect();

}