

export { default } from "next-auth/middleware";//This
export const config = {
    matcher: [
        "/dashboard",
        "/admin/:path*",
        "/ultils/techtool/:path*",
        "/ultils/currency/:path*"
    ]
}



