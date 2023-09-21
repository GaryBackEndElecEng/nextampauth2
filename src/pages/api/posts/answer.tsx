import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@_prisma/client";
import type { DataType, userType, answerType_2, PostDataType } from "@component/context/type";
import { getServerSession } from "next-auth";
import authOptions from "@component/context/options";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = "masterultils-postimages"
const region = process.env._AWS_BUCKET_REGION as string
const accessKeyId = process.env._AWS_ACCESS_KEY as string
const secretAccessKey = process.env._AWS_ACCESS_SECRET as string

type messageType = {
    message: string
}


const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});
async function getImgAndPost(post: PostDataType): Promise<PostDataType> {
    if (post.imageKey) {
        const params = {
            Bucket: bucketName,
            Key: post.imageKey
        }
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        post.imageKey = url
        return post
    } else {
        return post
    }
}

export default async function handle(req: NextApiRequest, res: NextApiResponse<any>) {


    if (req.method == "POST") {
        const body: answerType_2 = req.body
        if (body.answer && body.userId && body.postId) {
            const { answer, postId, userId } = body;
            try {

                const data = await prisma.answer.create({
                    data: {
                        answer: answer,
                        userId: userId,
                        postId: postId
                    }
                });
                const getPost = await prisma.post.findUnique({
                    where: {
                        id: data.postId
                    },
                    include: {
                        answers: true
                    }
                });
                if (getPost) {
                    const newPost = await getImgAndPost(getPost as PostDataType);
                    res.status(200).json(newPost)
                } else {
                    res.status(400).json({ message: "post not found" })
                }

            } catch (error) {
                res.status(500).json({ message: " server error" })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(404).json({ message: " data was not recieved" })
        }
    }


}