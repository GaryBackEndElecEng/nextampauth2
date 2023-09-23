import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
    const response = NextResponse.next()
    if (req.url.startsWith("/")) {
        console.log("clicked");
    }
    console.log("CLICKED");
    return response
}
export const config = {
    matcher: [
        "/:path*"
    ]
}
