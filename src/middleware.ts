import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
/* Here verifyemail is public path because when we confirm by email than will use this  */
  const token = request.cookies.get('token')?.value || '' /* here we used || '' because if we dnt write than it will return undefined */
/* Here we will check token  */
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile/:path*'
    /* This is for nesting in path */
  ]
}