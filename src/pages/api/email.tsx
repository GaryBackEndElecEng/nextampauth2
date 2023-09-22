import { transporter, mailOptions } from "@component/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@_prisma/client";


const generateText = (name: string, email: string) => {
    return (
        `<h1>Community member</h1>
    <br>
    <h4>${name}</h4>
    <p>We are always updating our free services and will let you know when, new services are available</p>
    <p>We will email as soon as new services become available to your email @: ${email}</p>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
const generateHTML = (name: string, email: string) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You've signed up</title>
        </head>
        <body>
            <h1>Community member</h1>
            <br>
            <h4>${name}</h4>
            <p>We are always updating our free services and will let you know when, new services are available</p>
            <p>We will email as soon as new services become available to your email @: ${email}</p>
            <br>
            <br>
            <br>
            <br>
            <div class="background-whitesmoke text-align-center flex-col items-center gap-2">
            <a href="www.masterconncet.ca">master connect</a>
            <p>email: masterultils@gmail.com</p>
                <img src="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png" alt="www.masterconnect.ca"
                />
            </div>
        </body>
        </html>
    `
    )
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = req.body;
        if (!(data.name && data.email)) {
            res.status(302).json({ message: "I think you forgot something" })
        }
        try {
            const adddata = await prisma.signup.upsert({
                create: {
                    ...data
                },
                update: {
                    name: data.name
                },
                where: {
                    email: data.email
                }

            });
            if (adddata && adddata.name && adddata.email) {
                await transporter.sendMail({
                    ...mailOptions(adddata.email),
                    subject: `Thank you ${adddata.name} for signing up!`,
                    text: generateText(adddata.name, adddata.email),
                    html: generateHTML(adddata.name, adddata.email)
                });
                return res.status(200).json({ message: "sent" });
            }
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ message: error.message })
        } finally {
            await prisma.$disconnect();
        }
    }
    res.status(400).json({ message: "Bad request" })
}
export default handler;