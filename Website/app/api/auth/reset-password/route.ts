import { NextRequest, NextResponse } from 'next/server';
import { validatePassword, hashPassword, createRateLimiter } from '@/lib/auth';
import { resetPassword } from '@/lib/database';
import { verifyCaptcha } from '@/lib/captcha';

// Rate limiting: 5 attempts per 15 minutes per IP
const resetPasswordRateLimit = createRateLimiter(5, 15 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const rateLimitResult = resetPasswordRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many password reset attempts. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { token, password, confirmPassword, captchaId, captchaAnswer } = body;
    
    // Input validation
    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Verify CAPTCHA
    if (!captchaId || !captchaAnswer) {
      return NextResponse.json(
        { error: 'CAPTCHA verification is required' },
        { status: 400 }
      );
    }
    
    if (!verifyCaptcha(captchaId, captchaAnswer)) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA. Please try again.' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password requirements not met', details: passwordValidation.errors },
        { status: 400 }
      );
    }
    
    // Check password confirmation
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }
    
    // Hash new password
    const newPasswordHash = await hashPassword(password);
    
    // Reset password
    const user = await resetPassword(token, newPasswordHash);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successfully! You can now sign in with your new password.'
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}