import { NextApiRequest, NextApiResponse } from "next";
import type { userType, deleteType, PostDataType } from "@component/context/type";
import prisma from "@_prisma/client";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
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
async function fillUsersS3Posts(users: userType[]): Promise<userType[]> {

    var post: PostDataType;
    var allUsers: userType[] = users;
    var user: userType;
    for (user of allUsers) {
        for (post of user.posts) {
            if (post.imageKey) {
                const params = {
                    Bucket: bucketName,
                    Key: post.imageKey
                }
                const command = new GetObjectCommand(params);
                post.imageKey = await getSignedUrl(s3, command, { expiresIn: 3600 });
            }
        }
    }
    return allUsers
}
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = req.body;
    const { name, email, postId, userId, deleteThis, published } = body;


    const adminuser = process.env.NEXT_PUBLIC_adminuser;
    const adminemail = process.env.NEXT_PUBLIC_adminemail;
    const check: boolean = (adminemail === email && adminuser === name) ? true : false;
    if (req.method === "POST" && check) {
        if (!postId && !userId) {
            try {
                const allUsers = await prisma.user.findMany({
                    include: {
                        posts: true,
                        answers: true
                    }
                });
                const s3Users = await fillUsersS3Posts(allUsers as userType[]);

                res.status(200).json(s3Users);
            } catch (error) {
                res.status(500).json({ message: "server error on findMany" })
            } finally {
                await prisma.$disconnect()
            }
        }
        else if (postId && userId && deleteThis) {
            try {
                const getDeleted = await prisma.post.delete({
                    where: {
                        id: postId
                    }
                });
                res.status(200).json(getDeleted);
            } catch (error) {
                res.status(500).json({ message: "server error on delete" })
            } finally {
                await prisma.$disconnect();
            }
        }
        else if (postId && userId && !deleteThis) {

            try {
                const getUpdate = await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        published: published
                    },
                    include: {
                        answers: true
                    }

                });
                res.status(200).json(getUpdate);

            } catch (error) {
                res.status(500).json({ message: "server error on update" })
            } finally {
                await prisma.$disconnect();
            }
        }


    }
}