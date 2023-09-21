import { NextApiRequest, NextApiResponse } from "next";
import type { PostDataType, adminDeleteUserType, userType } from "@component/context/type";
import prisma from "@_prisma/client";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
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
async function delUsersS3Imgs(user: userType): Promise<void> {
    var resArr: { loaded: boolean, image: string }[] = [];
    var post: PostDataType;
    var modUser: userType = user;

    for (post of modUser.posts) {
        if (post.imageKey) {

            const params = {
                Bucket: bucketName,
                Key: post.imageKey
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);
            resArr.push({ loaded: true, image: post.imageKey })


        } else {
            resArr.push({ loaded: false, image: "no image" })
        }
    }

}

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body: adminDeleteUserType = req.body;
    const { name, email, userId } = body;

    console.log("USERID", userId)
    const adminuser = process.env.NEXT_PUBLIC_adminuser;
    const adminemail = process.env.NEXT_PUBLIC_adminemail;
    const check: boolean = (adminemail === email && adminuser === name) ? true : false;
    if (req.method === "POST" && check) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: userId
                },
                include: {
                    posts: true,
                    answers: true
                }
            });
            if (user) {
                console.log("imagekey", user.posts)
                await delUsersS3Imgs(user as userType)
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "did not find" })
            }
        } catch (error) {
            res.status(500).json({ message: "server error@ admindelete" })
        } finally {
            await prisma.$disconnect()
        }

    }

}