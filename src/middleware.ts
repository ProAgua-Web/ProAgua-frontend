import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('access_token')?.value
    console.log("Middleware", request.nextUrl.pathname);

    if (!isAuthenticated) {
        if (request.nextUrl.pathname.startsWith("/admin")) {
            return Response.redirect(new URL('/login', request.url));
        }
    } else if (request.nextUrl.pathname == "/login") {
        return Response.redirect(new URL('/admin/pontos', request.url));
    }
}
 
export const config = {
    matcher: ['/:path*'],
}