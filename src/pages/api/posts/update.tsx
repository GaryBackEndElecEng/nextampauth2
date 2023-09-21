import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from 'next-auth';
// import  authOptions  from "@component/context/options";
import type { DataType, userType, PostDataType, answerType } from "@component/context/type";
import prisma from "@_prisma/client";
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
export async function allS3ImagePosts(posts: PostDataType[]): Promise<PostDataType[]> {
  let Posts: PostDataType[] = posts;
  var post: PostDataType;
  for (post of Posts) {
    if (post.imageKey) {
      const params = {
        Bucket: bucketName,
        Key: post.imageKey
      }
      const command = new GetObjectCommand(params);
      post.imageKey = await getSignedUrl(s3, command, { expiresIn: 3600 });

    }
  }
  return Posts
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const session= await getServerSession(authOptions);

  const body: PostDataType = req.body;
  if (req.method === "PUT" && body) {
    try {
      const getBody: PostDataType = await req.body;
      //postId:6, userId:2
      //pull userId from teh session ( next.auth)

      const updatePost = await prisma.post.update({
        where: {
          id: body.id as number
        },
        data: {
          id: getBody.id as number,
          title: getBody.title,
          content: getBody.content,
          published: getBody.published,
          userId: getBody.userId,
        }
      });

      const getAll = await prisma.post.findMany({
        include: {
          answers: true
        }
      });
      const S3Posts = await allS3ImagePosts(getAll as PostDataType[])
      res.status(200).json(S3Posts);

    } catch (error) {
      res.status(404).json({ message: "did not find your post" })
    } finally {
      await prisma.$disconnect()
    }
  }

}