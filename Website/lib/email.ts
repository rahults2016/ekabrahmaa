// Email service implementation
// In production, integrate with services like SendGrid, AWS SES, or Resend

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

// Mock email service for development
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  // In development, just log the email
  console.log('📧 Email would be sent:', {
    to: options.to,
    subject: options.subject,
    preview: options.text.substring(0, 100) + '...'
  });
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
};

// Email templates
export const getVerificationEmailTemplate = (name: string, verificationUrl: string): EmailTemplate => {
  const subject = 'Verify your ekaBrahmaa account';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #0d9488, #ec4899); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🍃</div>
          <h1 style="color: #0d9488; margin: 0;">Welcome to ekaBrahmaa</h1>
        </div>
        
        <h2>Hi ${name},</h2>
        
        <p>Thank you for joining ekaBrahmaa! We're excited to help you on your healing journey.</p>
        
        <p>To get started, please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button">Verify Email Address</a>
        </div>
        
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #0d9488;">${verificationUrl}</p>
        
        <p>This verification link will expire in 24 hours for security reasons.</p>
        
        <p>If you didn't create an account with ekaBrahmaa, you can safely ignore this email.</p>
        
        <div class="footer">
          <p>Best regards,<br>The ekaBrahmaa Team</p>
          <p>Ancient wisdom for modern healing</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Welcome to ekaBrahmaa!
    
    Hi ${name},
    
    Thank you for joining ekaBrahmaa! We're excited to help you on your healing journey.
    
    To get started, please verify your email address by visiting this link:
    ${verificationUrl}
    
    This verification link will expire in 24 hours for security reasons.
    
    If you didn't create an account with ekaBrahmaa, you can safely ignore this email.
    
    Best regards,
    The ekaBrahmaa Team
    Ancient wisdom for modern healing
  `;
  
  return { subject, html, text };
};

export const getPasswordResetEmailTemplate = (name: string, resetUrl: string): EmailTemplate => {
  const subject = 'Reset your ekaBrahmaa password';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #0d9488, #ec4899); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .warning { background: #fef3cd; border: 1px solid #fde047; border-radius: 8px; padding: 15px; margin: 20px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🍃</div>
          <h1 style="color: #0d9488; margin: 0;">Password Reset</h1>
        </div>
        
        <h2>Hi ${name},</h2>
        
        <p>We received a request to reset your password for your ekaBrahmaa account.</p>
        
        <p>Click the button below to reset your password:</p>
        
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #0d9488;">${resetUrl}</p>
        
        <div class="warning">
          <strong>⚠️ Security Notice:</strong>
          <ul>
            <li>This link will expire in 1 hour for security reasons</li>
            <li>If you didn't request this password reset, please ignore this email</li>
            <li>Your password will remain unchanged until you create a new one</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Best regards,<br>The ekaBrahmaa Team</p>
          <p>If you have any questions, contact us at support@ekabrahmaa.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Password Reset - ekaBrahmaa
    
    Hi ${name},
    
    We received a request to reset your password for your ekaBrahmaa account.
    
    Click this link to reset your password:
    ${resetUrl}
    
    Security Notice:
    - This link will expire in 1 hour for security reasons
    - If you didn't request this password reset, please ignore this email
    - Your password will remain unchanged until you create a new one
    
    Best regards,
    The ekaBrahmaa Team
    
    If you have any questions, contact us at support@ekabrahmaa.com
  `;
  
  return { subject, html, text };
};

export const getWelcomeEmailTemplate = (name: string): EmailTemplate => {
  const subject = 'Welcome to your healing journey with ekaBrahmaa';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ekaBrahmaa</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; background: linear-gradient(135deg, #0d9488, #ec4899); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .button { display: inline-block; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .feature { background: #f0fdfa; border-radius: 8px; padding: 15px; margin: 15px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🍃</div>
          <h1 style="color: #0d9488; margin: 0;">Welcome to ekaBrahmaa!</h1>
        </div>
        
        <h2>Hi ${name},</h2>
        
        <p>Welcome to ekaBrahmaa! We're thrilled to have you join our community of healing and wellness.</p>
        
        <p>Your account has been successfully verified and you're now ready to begin your personalized healing journey.</p>
        
        <h3>What's Next?</h3>
        
        <div class="feature">
          <strong>🧘‍♀️ Take Your Prakriti Quiz</strong><br>
          Discover your unique mind-body constitution and get personalized recommendations.
        </div>
        
        <div class="feature">
          <strong>🌿 Explore Our Programs</strong><br>
          Choose from our carefully crafted healing programs designed for your specific needs.
        </div>
        
        <div class="feature">
          <strong>👥 Meet Your Healers</strong><br>
          Connect with our team of expert Ayurveda practitioners, nutritionists, and wellness coaches.
        </div>
        
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/quiz" class="button">Start Your Journey</a>
        </div>
        
        <p>If you have any questions or need assistance, our support team is here to help at support@ekabrahmaa.com</p>
        
        <div class="footer">
          <p>With gratitude,<br>The ekaBrahmaa Team</p>
          <p>One Source. Infinite Healing.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Welcome to ekaBrahmaa!
    
    Hi ${name},
    
    Welcome to ekaBrahmaa! We're thrilled to have you join our community of healing and wellness.
    
    Your account has been successfully verified and you're now ready to begin your personalized healing journey.
    
    What's Next?
    
    🧘‍♀️ Take Your Prakriti Quiz
    Discover your unique mind-body constitution and get personalized recommendations.
    
    🌿 Explore Our Programs
    Choose from our carefully crafted healing programs designed for your specific needs.
    
    👥 Meet Your Healers
    Connect with our team of expert Ayurveda practitioners, nutritionists, and wellness coaches.
    
    Start your journey: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/quiz
    
    If you have any questions or need assistance, our support team is here to help at support@ekabrahmaa.com
    
    With gratitude,
    The ekaBrahmaa Team
    One Source. Infinite Healing.
  `;
  
  return { subject, html, text };
};