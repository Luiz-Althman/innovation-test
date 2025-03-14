import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('innovation:access_token')?.value;
    const isAuthPage = req.nextUrl.pathname === '/';

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
