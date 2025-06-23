// Simple CAPTCHA implementation
// In production, consider using services like reCAPTCHA, hCaptcha, or Turnstile

export interface CaptchaChallenge {
  id: string;
  question: string;
  answer: string;
  expiresAt: Date;
}

// In-memory storage for CAPTCHA challenges
const challenges = new Map<string, CaptchaChallenge>();

// Math-based CAPTCHA questions
const generateMathChallenge = (): { question: string; answer: string } => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 25;
      num2 = Math.floor(Math.random() * 25) + 1;
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = 5;
      num2 = 3;
      answer = 8;
  }
  
  return {
    question: `What is ${num1} ${operation} ${num2}?`,
    answer: answer.toString()
  };
};

// Generate a new CAPTCHA challenge
export const generateCaptcha = (): { id: string; question: string } => {
  const id = Math.random().toString(36).substring(2, 15);
  const { question, answer } = generateMathChallenge();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  challenges.set(id, {
    id,
    question,
    answer,
    expiresAt
  });
  
  // Clean up expired challenges
  cleanupExpiredChallenges();
  
  return { id, question };
};

// Verify CAPTCHA answer
export const verifyCaptcha = (id: string, userAnswer: string): boolean => {
  const challenge = challenges.get(id);
  
  if (!challenge) {
    return false;
  }
  
  if (challenge.expiresAt < new Date()) {
    challenges.delete(id);
    return false;
  }
  
  const isCorrect = challenge.answer === userAnswer.trim();
  
  // Remove challenge after verification attempt (one-time use)
  challenges.delete(id);
  
  return isCorrect;
};

// Clean up expired challenges
const cleanupExpiredChallenges = (): void => {
  const now = new Date();
  for (const [id, challenge] of challenges.entries()) {
    if (challenge.expiresAt < now) {
      challenges.delete(id);
    }
  }
};

// Visual CAPTCHA generation (SVG-based)
export const generateVisualCaptcha = (): { id: string; svg: string; answer: string } => {
  const id = Math.random().toString(36).substring(2, 15);
  const text = Math.random().toString(36).substring(2, 7).toUpperCase();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  
  // Generate SVG with distorted text
  const svg = `
    <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="noise">
          <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
        </filter>
      </defs>
      <rect width="200" height="80" fill="#f0fdfa"/>
      ${generateRandomLines()}
      <text x="100" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" fill="#0d9488" filter="url(#noise)">${text}</text>
      ${generateRandomDots()}
    </svg>
  `;
  
  challenges.set(id, {
    id,
    question: 'Enter the text shown in the image',
    answer: text,
    expiresAt
  });
  
  return { id, svg, answer: text };
};

// Helper functions for visual CAPTCHA
const generateRandomLines = (): string => {
  let lines = '';
  for (let i = 0; i < 3; i++) {
    const x1 = Math.random() * 200;
    const y1 = Math.random() * 80;
    const x2 = Math.random() * 200;
    const y2 = Math.random() * 80;
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>`;
  }
  return lines;
};

const generateRandomDots = (): string => {
  let dots = '';
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 200;
    const cy = Math.random() * 80;
    const r = Math.random() * 2 + 1;
    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0d9488" opacity="0.3"/>`;
  }
  return dots;
};

// Rate limiting for CAPTCHA generation
const captchaRateLimit = new Map<string, { count: number; resetTime: number }>();

export const checkCaptchaRateLimit = (identifier: string): { allowed: boolean; remaining: number } => {
  const maxAttempts = 10;
  const windowMs = 60 * 1000; // 1 minute
  const now = Date.now();
  
  const userAttempts = captchaRateLimit.get(identifier);
  
  if (!userAttempts || now > userAttempts.resetTime) {
    captchaRateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }
  
  if (userAttempts.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }
  
  userAttempts.count++;
  return { allowed: true, remaining: maxAttempts - userAttempts.count };
};