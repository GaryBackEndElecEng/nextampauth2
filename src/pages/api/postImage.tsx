import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import sharp from "sharp";

export const config = { runtime: 'experimental-edge' }

const bucketName = "masterultils-postimages"
const region = process.env._AWS_BUCKET_REGION as string
const accessKeyId = process.env._AWS_ACCESS_KEY as string
const secretAccessKey = process.env._AWS_ACCESS_SECRET as string

export type fileType = {
    name: string,
    lastModified: number,
    lastModifiedDate: Date,
    webkitRelativePath?: string,
    size: number,
    type: string
} | null

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});
export default async function handle(request: NextRequest, res: NextApiResponse) {
    if (request.method === "POST") {

        const formdata = await request.formData() as FormData;

        const file: File | null = formdata.get("file") as unknown as File;
        const getKey: string | null = formdata.get("name") as unknown as string;
        if (!file) {
            return res.status(404).json({ error: "file doesn't exist" })
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // const reSizeBuffer=await sharp(buffer).resize({width:600,height:700}).toBuffer()

        const getPath = "../../../public/images" + `/${file.name}.png`;

        // console.log("NAME",file.name);
        if (!(buffer || file.name || getKey)) {
            NextResponse.json({ error: "no file name" })
        }

        const params = {
            Bucket: bucketName,
            Body: buffer,
            Key: `${getKey}`,
            // ContentType:formdata.mimetype
        }

        const command = new PutObjectCommand(params);
        const result = await s3.send(command);
        NextResponse.json({ success: `${true}-${result.$metadata.httpStatusCode}` })
    }





}