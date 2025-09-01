
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic aqui se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Proteger rotas específicas
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        if (req.nextUrl.pathname.startsWith('/projects/create')) {
          return !!token
        }
        if (req.nextUrl.pathname.startsWith('/profile')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/create',
    '/projects/edit/:path*',
    '/profile/:path*'
  ]
}
