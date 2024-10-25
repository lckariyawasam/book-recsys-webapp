import { handlers } from "@/auth"

export const { GET, POST } = handlers

// Remove the middleware export from here
// export { auth as middleware } from "@/auth"

// If you need to use the middleware, export it separately in a middleware.ts file
