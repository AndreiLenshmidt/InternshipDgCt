'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from './utils/cookies';
import { projectsUrl } from './consts';

export async function middleware(request: NextRequest) {
   const tokenCookie = request.cookies.get('token-auth');
   const token = tokenCookie?.value;
   // console.log(token);
   const response = NextResponse.next();

   if (request.nextUrl.pathname.startsWith('/auth') && token) {
      console.log(token);
      return NextResponse.redirect(new URL('/projects', request.url));
   }

   if (request.nextUrl.pathname.startsWith('/projects') && token) {
      console.log(token);
      return response;
   } else if (request.nextUrl.pathname.startsWith('/projects') && !token) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   if (request.nextUrl.pathname.startsWith('/') && token) {
      console.log(token);
      return response;
   } else if (request.nextUrl.pathname.startsWith('/') && !token) {
      return response;
   }
}

export const config = {
   matcher: ['/', '/auth', `${projectsUrl}/:path*`],
};
