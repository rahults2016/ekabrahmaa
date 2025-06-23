import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/resend-verification',
  '/what-we-heal',
  '/programs',
  '/blogs',
  '/consultation',
  '/stories',
  '/quiz',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/auth/captcha',
  '/api/auth/csrf',
  '/api/auth/resend-verification'
];

// Check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => {
    if (publicPath.endsWith('*')) {
      return path.startsWith(publicPath.slice(0, -1));
    }
    return path === publicPath || path.startsWith(`${publicPath}/`);
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and public paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    isPublicPath(pathname)
  ) {
    return NextResponse.next();
  }
  
  // Check for access token
  const accessToken = request.cookies.get('accessToken')?.value;
  
  if (!accessToken) {
    // No token, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Verify token
  const tokenData = verifyToken(accessToken, 'access');
  
  if (!tokenData) {
    // Invalid token, redirect to login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Token is valid, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};