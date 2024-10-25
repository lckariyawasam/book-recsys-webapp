import { auth } from "@/auth"

async function middleware() {
  const session = await auth()
  return session
}

export default auth((req) => {
  const publicPaths = ['/', '/auth/signin', '/auth/signup', '/find-similar', '/input-read-books']
  if (!req.auth && !publicPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
