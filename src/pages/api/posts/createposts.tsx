import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@_prisma/client";
import type { PostDataType, answerType } from "@component/context/type";
import { getServerSession } from "next-auth";
import authOptions from "@component/context/options";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = "masterultils-postimages"
const region = process.env._AWS_BUCKET_REGION as string
const accessKeyId = process.env._AWS_ACCESS_KEY as string
const secretAccessKey = process.env._AWS_ACCESS_SECRET as string

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
    // const session= await getServerSession(authOptions);
    const body = req.body as PostDataType;
    const { title, content, published, userId } = body;

    // console.log(req.body)

    if (req.method === "POST") {
        try {
            const getUserId = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (getUserId && body && body.title && body.content) {

                const createPost = await prisma.post.create({
                    data: {
                        title: body.title,
                        content: body.content,
                        date: body.date,
                        published: body.published,
                        userId: body.userId,
                        imageKey: body?.imageKey

                    },
                    include: {
                        answers: false
                    }

                });
                let addedPost: PostDataType = createPost as PostDataType;
                if (addedPost.imageKey) {
                    const params = {
                        Bucket: bucketName,
                        Key: `${createPost.imageKey}`,
                        // ContentType:formdata.mimetype
                    }

                    const command = new GetObjectCommand(params);
                    const imageurl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    addedPost.imageKey = imageurl
                }

                res.status(200).json(addedPost)
            } else {
                res.status(400).json({ message: `did not create,either missing info ${JSON.stringify(req.body)} or no user associated` })
            }
            prisma.$disconnect();
        } catch (error) {
            res.status(500).json({ message: "server issue at create post" })
        }
    }
}

