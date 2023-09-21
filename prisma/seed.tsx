import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const adminuser = "gary Wallace";
const adminemail = "masterconnect919@gmail.com";
const adminpassword = "JamieIs12!";
export async function hashKey(pswd: string) {
    let salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(pswd, salt)
}
export async function hashComp(pswd: string, hash: string) {
    var comp = bcrypt.compare(pswd, hash);
    return comp
}
const prisma = new PrismaClient();

async function main() {
    const pswd = await hashKey(adminpassword as string)
    if (pswd) {
        const user = await prisma.user.upsert({
            where: { email: adminemail },
            update: {
                password: pswd,
                name: adminuser
            },
            create: {
                email: adminemail,
                name: adminuser,
                password: pswd
            },
            include: {
                posts: false,
                answers: false,
            }
        });

        if (user) {
            console.log("INSERTED", user)
        } else {
            console.log(`NOT INSERTED-check password: ${pswd}`)
        }
    }
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })