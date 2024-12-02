'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('token-auth');
  const token = tokenCookie?.value;
  const response = NextResponse.next();
  response.cookies.set('userIsAuth', 'true');

  if (request.nextUrl.pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/projects') && token) {
    return response;
  } else if (request.nextUrl.pathname.startsWith('/projects')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/') && token) {
    return response;
  } else if (request.nextUrl.pathname.startsWith('/')) {
    response.cookies.set('userIsAuth', 'false');
    return response;
  }
}

export const config = {
  matcher: ['/', '/auth', '/projects/:path*'],
};
