import { NextRequest, NextResponse } from 'next/server';
import { validateEmail, generateVerificationToken, createRateLimiter } from '@/lib/auth';
import { findUserByEmail, updateUser } from '@/lib/database';
import { sendEmail, getVerificationEmailTemplate } from '@/lib/email';
import { verifyCaptcha } from '@/lib/captcha';

// Rate limiting: 3 attempts per 15 minutes per IP
const resendVerificationRateLimit = createRateLimiter(3, 15 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const rateLimitResult = resendVerificationRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many verification email requests. Please try again later.',
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
    
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }
    
    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'This email address is already verified' },
        { status: 400 }
      );
    }
    
    // Generate new verification token
    const emailVerificationToken = generateVerificationToken();
    
    // Update user with new token
    await updateUser(user.id, { emailVerificationToken });
    
    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${emailVerificationToken}`;
    const emailTemplate = getVerificationEmailTemplate(user.name, verificationUrl);
    
    try {
      await sendEmail({
        to: user.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully! Please check your inbox.'
    });
    
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}