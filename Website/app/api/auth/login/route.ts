import { NextRequest, NextResponse } from 'next/server';
import { 
  validateEmail, 
  verifyPassword, 
  generateTokens, 
  setAuthCookies,
  createRateLimiter 
} from '@/lib/auth';
import { findUserByEmail, updateUser, createSession } from '@/lib/database';
import { verifyCaptcha } from '@/lib/captcha';

// Rate limiting: 5 attempts per 15 minutes per IP
const loginRateLimit = createRateLimiter(5, 15 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const rateLimitResult = loginRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { email, password, rememberMe, captchaId, captchaAnswer } = body;
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Verify CAPTCHA (required after failed attempts)
    if (captchaId && captchaAnswer) {
      if (!verifyCaptcha(captchaId, captchaAnswer)) {
        return NextResponse.json(
          { error: 'Invalid CAPTCHA. Please try again.' },
          { status: 400 }
        );
      }
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
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          error: 'Please verify your email address before signing in',
          code: 'EMAIL_NOT_VERIFIED'
        },
        { status: 403 }
      );
    }
    
    // Generate tokens
    const tokens = generateTokens(user.id, rememberMe);
    
    // Create session
    const userAgent = request.headers.get('user-agent') || undefined;
    const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000);
    
    await createSession({
      userId: user.id,
      refreshToken: tokens.refreshToken,
      expiresAt,
      userAgent,
      ipAddress: ip
    });
    
    // Update last login
    await updateUser(user.id, { lastLoginAt: new Date() });
    
    // Set auth cookies
    setAuthCookies(tokens, rememberMe);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}