import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('auth_user');
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = ['/', '/login', '/qr-codes'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // API routes are always allowed
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Static files and Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // If trying to access protected route without auth
  if (!isPublicRoute && !authCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page, redirect to appropriate dashboard
  if (pathname === '/login' && authCookie) {
    try {
      const user = JSON.parse(authCookie.value);
      const redirectUrl = user.role === 'kasir' 
        ? new URL('/kasir', request.url)
        : new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      // Invalid cookie, allow access to login
      const response = NextResponse.next();
      response.cookies.delete('auth_user');
      return response;
    }
  }

  // Role-based access control for authenticated users
  if (authCookie && !isPublicRoute) {
    try {
      const user = JSON.parse(authCookie.value);
      
      // Kasir can only access /kasir
      if (user.role === 'kasir' && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/kasir', request.url));
      }
      
      // Admin/Developer cannot access /kasir (redirect to dashboard)
      if ((user.role === 'admin' || user.role === 'developer') && pathname.startsWith('/kasir')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Invalid cookie, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_user');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
