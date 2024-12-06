import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const csrfToken = request.cookies.get('csrftoken')?.value;
  let isValid = false;

  // Verify the access token in the backend
  if (accessToken && csrfToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
          'cookie': `csrftoken=${csrfToken}`,
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      },
    );
    isValid = response.status === 200;
  }

  // Check if there is an valid access token
  if (!isValid) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname == '/login') {
    return Response.redirect(new URL('/admin/pontos', request.url));
  }
}

export const config = {
  matcher: ['/:path*'],
};
