import { NextRequest, NextResponse } from 'next/server';
import { generateCaptcha, generateVisualCaptcha, checkCaptchaRateLimit } from '@/lib/captcha';

export async function GET(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'math';
    
    // Check rate limit
    const rateLimitResult = checkCaptchaRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many CAPTCHA requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    if (type === 'visual') {
      const { id, svg } = generateVisualCaptcha();
      return NextResponse.json({
        id,
        type: 'visual',
        svg,
        remaining: rateLimitResult.remaining
      });
    } else {
      const { id, question } = generateCaptcha();
      return NextResponse.json({
        id,
        type: 'math',
        question,
        remaining: rateLimitResult.remaining
      });
    }
    
  } catch (error) {
    console.error('CAPTCHA generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CAPTCHA' },
      { status: 500 }
    );
  }
}