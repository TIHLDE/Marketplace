export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        '/me/:path*',
        '/admin/:path*',
        '/handlekurv'
    ]
};