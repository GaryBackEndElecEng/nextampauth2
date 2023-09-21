import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export { default } from "next-auth/middleware";//This protects the entire app

export const config = {
    matcher: [
        "/dashboard",
        "/admin/:path*",
        "/ultils/techtool/:path*",
        "/ultils/currency/:path*"
    ]
}

