
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@_prisma/client";
import type { DataType, userType, PostDataType, answerType } from "@component/context/type";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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

async function insertS3ImageToPosts(posts: PostDataType[]): Promise<PostDataType[]> {
  let arr: PostDataType[] = [];
  var post: PostDataType;
  for (post of posts) {
    const params = {
      Bucket: bucketName,
      Key: post.imageKey,
    }
    if (post.imageKey) {
      const command = new GetObjectCommand(params);
      const url: string = await getSignedUrl(s3, command, { expiresIn: 3600 });
      post.imageKey = url;

    }
    arr.push(post);
  }
  return arr
}


type messageType = {
  message: string
}

export function convert(id: string | string[] | undefined): string | undefined {
  if (typeof (id) === "string") {
    return id
  } else if (typeof (id) === "string" && id[1]) {
    let conv = id[1]
    return conv
  } else {
    return
  }

}
export function convertPost(id: string | string[] | undefined): number | undefined {
  if (typeof (id) === "string") {
    return parseInt(id)
  } else if (typeof (id) === "string" && id[1]) {
    let conv = id[1]
    return parseInt(conv)
  } else {
    return
  }

}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId } = req.query;
  const getPostId: number | undefined = convertPost(postId);
  const getUserId: string | undefined = convert(userId);

  if (req.method === "GET" && !getPostId && !userId) {

    try {
      const posts = await prisma.post.findMany({
        include: {
          answers: true
        }
      });

      const Posts = await insertS3ImageToPosts(posts as PostDataType[])
      res.status(200).json(Posts)
      prisma.$disconnect()

    } catch (error) {
      res.status(404).json({ message: "did not get, not found" })
    }
  }

  if (getPostId && getUserId) {

    try {
      const deleteRec = await prisma.post.delete({
        where: {
          id: getPostId,
          userId: getUserId

        },
        include: {
          answers: true
        }
      });
      const params = {
        Bucket: bucketName,
        Key: deleteRec.imageKey as string,
      }
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
      res.status(200).json(deleteRec);
      prisma.$disconnect();
    } catch (error) {
      res.status(400).json({ message: "could not find" })
    }
  }




}

