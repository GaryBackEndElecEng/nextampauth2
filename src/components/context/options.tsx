import {type NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import  Providers from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { URLSearchParams } from "url";
import { Prisma,PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type {userAccountType,userType} from "@component/context/type";
const logo=`${process.env.NEXT_PUBLIC_aws}/logo.png`
import httpUrl from "@component/context/httpUrl";


let prisma: PrismaClient

if(process.env.NODE_ENV==='production'){
  prisma= new PrismaClient({
    datasourceUrl:process.env.DATABASE_URL_heroku
  });
}else{
  prisma= new PrismaClient({
    datasourceUrl:process.env.DATABASE_URL_local
  });
}
// const baseurl=httpUrl();

export async function hashKey(pswd:string){
    let salt=bcrypt.genSaltSync(8);
    return bcrypt.hashSync(pswd,salt)
  }
  export async function hashComp(pswd:string,hash:string){
    var comp=bcrypt.compare(pswd,hash);
    return comp
  }

 const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials, }) {
        //activate only after the signin is successful
         if(credentials || account?.userId){
          return true
        }
        return false
      
    },
    async redirect({ url, baseUrl }) {
        // Allows relative callback URLs in the middleware(match)
        if (url.startsWith("/"))
        { 
          return `${url}`
        }
        // Allows callback URLs on the same origin
        if (new URL(url).origin === baseUrl)
        {
           return url
        }
        return baseUrl
            
        
    },
    async session({ session, user, token }) {
        // console.log("session",session,token,user) //works
        console.log(token)
      return {
        ...session,
        user:{
           ...session.user, 
           id:token.id,
            randomKey:token.id
        }
        
      }
    },
    async jwt({ token, user }) {
        // console.log("token from authOptions",token,user)// works jwt executes first before session
        if(user){
            const u= user as userType;
            return{
                ...token,
                id:u.id,
            }
        }
      return token
    }
    
  },
session:{
strategy:"jwt"
},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_client_ID as string,
      clientSecret: process.env.GOOGLE_client_secret as string,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    
    }),
    CredentialsProvider({
        
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'log in',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "email", type: "text", placeholder: "email@mail.com" },
          password: { label: "Password", type: "password" }
        },
        
        async authorize(credentials,req) {
            let cred=credentials
            if(!cred?.email || !cred?.password){
              return null
            }
            const user = await prisma.user.findUnique({
              where:{
                  email:cred.email
              }
            });
          //   console.log(user)// worked
            if(!user){
              await prisma.$disconnect()
              return null
            }
            if(user.password){
            const check=await hashComp(cred?.password,user?.password) ? true:false;
            if(!check){
              await prisma.$disconnect()
              return null
            }
            }else{
              await prisma.$disconnect()
              return null
            }
            return{id:user.id + "",email:user.email, name:user.name}
          
        }
        
      }),
    // ...add more providers here
  ],
  
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#33FF5D', // Hex color code #33FF5D
    logo: logo, // Absolute URL to image
  },
 
  debug:process.env.NODE_ENV==="development"

}
export default authOptions;