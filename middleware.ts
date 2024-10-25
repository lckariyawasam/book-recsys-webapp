import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  // Check for /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (!token) {
      // If no token, return unauthorized response for API routes
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // Check for user/[id] routes
  const userIdMatch = request.nextUrl.pathname.match(/^\/user\/(\w+)/)
  if (userIdMatch) {
    const requestedUserId = userIdMatch[1]
    
    if (!token) {
      // If no token, redirect to login
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (token.sub !== requestedUserId) {
      // If ID doesn't match, redirect to home or show an error
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/api/:path*']
}
