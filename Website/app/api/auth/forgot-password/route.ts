import { NextRequest, NextResponse } from 'next/server';
import { validateEmail, generateVerificationToken, createRateLimiter } from '@/lib/auth';
import { findUserByEmail, setPasswordResetToken } from '@/lib/database';
import { sendEmail, getPasswordResetEmailTemplate } from '@/lib/email';
import { verifyCaptcha } from '@/lib/captcha';

// Rate limiting: 3 attempts per 15 minutes per IP
const forgotPasswordRateLimit = createRateLimiter(3, 15 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const rateLimitResult = forgotPasswordRateLimit(ip);
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
    const { email, captchaId, captchaAnswer } = body;
    
    // Input validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
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
    
    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Find user
    const user = await findUserByEmail(email);
    
    // Always return success to prevent email enumeration
    // But only send email if user exists
    if (user) {
      // Generate reset token
      const resetToken = generateVerificationToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      
      // Save reset token
      await setPasswordResetToken(email, resetToken, expiresAt);
      
      // Send reset email
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
      const emailTemplate = getPasswordResetEmailTemplate(user.name, resetUrl);
      
      try {
        await sendEmail({
          to: user.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text
        });
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        return NextResponse.json(
          { error: 'Failed to send password reset email. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, we\'ve sent password reset instructions.'
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}