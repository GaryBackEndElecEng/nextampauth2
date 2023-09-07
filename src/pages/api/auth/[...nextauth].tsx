import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authOptions from "@context/options";

// const prisma = new PrismaClient({
// });
// export const authOptions={
//     adapter: PrismaAdapter(prisma),
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_client_ID!,
//         clientSecret: process.env.GOOGLE_client_secret!,
//       }),
//     ],
//   }
export default NextAuth(authOptions);