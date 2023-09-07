import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest,NextFetchEvent } from "next/server";
import authOptions from "@/components/context/options";

export async function middleware(request:NextRequest,event:NextFetchEvent){
    const session= await getServerSession(authOptions);
    if(session){
        // console.log("GET API SESSION",session)
    }
    
    return NextResponse.next()
    
};