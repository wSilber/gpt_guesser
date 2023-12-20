export { default } from "next-auth/middleware"

export const config = {
   matcher: ['/((?!api/|favicon.ico|auth/).*)']
}
 