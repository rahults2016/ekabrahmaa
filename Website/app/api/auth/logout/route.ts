import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth';
import { deleteSession } from '@/lib/database';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    // Delete session from database
    if (refreshToken) {
      await deleteSession(refreshToken);
    }
    
    // Clear auth cookies
    clearAuthCookies();
    
    return NextResponse.json({
      success: true,
      message: 'Signed out successfully'
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during sign out' },
      { status: 500 }
    );
  }
}