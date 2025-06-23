import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Generate CSRF token
const generateCsrfToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Verify CSRF token
export const verifyCsrfToken = (token: string): boolean => {
  const cookieStore = cookies();
  const storedToken = cookieStore.get('csrf_token')?.value;
  
  if (!storedToken || !token) {
    return false;
  }
  
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
};

export async function GET(request: NextRequest) {
  try {
    const token = generateCsrfToken();
    const cookieStore = cookies();
    
    cookieStore.set('csrf_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/'
    });
    
    return NextResponse.json({ csrfToken: token });
    
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}