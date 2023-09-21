import { NextApiRequest, NextApiResponse } from "next";
import type { userType, deleteType, PostDataType } from "@component/context/type";
import prisma from "@_prisma/client";
import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env._AWS_BUCKET_IMAGE_NAME as string;
const region = process.env._AWS_BUCKET_REGION as string;
const accessKeyId = process.env._AWS_ACCESS_KEY as string;
const secretAccessKey = process.env._AWS_ACCESS_SECRET as string;

const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region
});
async function delUserS3Post(post: PostDataType): Promise<boolean> {
    var Post: PostDataType = post;
    var deleted: boolean = false;
    if (Post.imageKey) {
        try {
            const params = {
                Bucket: bucketName,
                Key: post.imageKey
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);
            deleted = true;
        } catch (error) {
            deleted = false
        }
    }
    return deleted
}
async function updateUserS3Post(post: PostDataType): Promise<PostDataType> {
    var Post: PostDataType = post;

    if (Post.imageKey) {
        const params = {
            Bucket: bucketName,
            Key: post.imageKey
        }
        const command = new GetObjectCommand(params);
        Post.imageKey = await getSignedUrl(s3, command, { expiresIn: 3600 })

    }
    return Post
}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = req.body;
    const { adminuser, adminemail, postId, userId, deleteThis, published, loaded } = body;

    const adminname = process.env.NEXT_PUBLIC_adminuser;
    const email = process.env.NEXT_PUBLIC_adminemail;
    const check: boolean = (adminemail === email && adminuser === adminname) ? true : false;
    if (req.method === "POST" && check) {

        if (deleteThis && loaded) {

            try {

                const getDeleted = await prisma.post.delete({
                    where: {
                        id: postId
                    },
                    include: {
                        answers: true
                    }
                });
                await delUserS3Post(getDeleted as PostDataType);
                res.status(200).json(getDeleted);
            } catch (error) {
                res.status(500).json({ message: "server error on delete" })
            } finally {
                await prisma.$disconnect()
            }
        }
        else if (!deleteThis && published && loaded) {

            try {
                const getUpdate = await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        published: published
                    },

                });
                const newUpdatePost = await updateUserS3Post(getUpdate as PostDataType)
                res.status(200).json(newUpdatePost);

            } catch (error) {
                res.status(500).json({ message: "server error on update" })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            await prisma.$disconnect()
            res.status(400).json({ message: "nothing happened" })
        }


    }
}