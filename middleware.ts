import { withAuth } from 'next-auth/middleware';
import Role, { adminRoles } from './app/enums/role';
import { NextResponse } from 'next/server';


export default withAuth(
    function middleware (req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const redirectUrl = new URL('/', req.url);

        if (!token) {
            return NextResponse.redirect('/signIn');
        }

        if (path.startsWith('/admin/user') && token.role !== Role.SUPERADMIN) {
            return NextResponse.redirect(redirectUrl);
        }

        if (path.startsWith('/admin') && !adminRoles.includes(token.role as Role)) {
            return NextResponse.redirect(redirectUrl);
        }
    }
);


export const config = {
    matcher: [
        '/me/:path*',
        '/admin/:path*',
        '/cart'
    ]
};