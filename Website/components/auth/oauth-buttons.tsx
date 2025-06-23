'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Facebook } from 'lucide-react';

interface OAuthButtonsProps {
  isLoading?: boolean;
}

export function OAuthButtons({ isLoading = false }: OAuthButtonsProps) {
  const handleOAuthSignIn = (provider: string) => {
    // In a real implementation, this would redirect to the OAuth provider
    console.log(`Signing in with ${provider}`);
    
    // Example implementation:
    // window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Separator className="flex-grow bg-gray-200" />
        <span className="px-3 text-sm text-gray-500">or continue with</span>
        <Separator className="flex-grow bg-gray-200" />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="border-gray-300 hover:bg-gray-50 text-gray-700"
          onClick={() => handleOAuthSignIn('google')}
          disabled={isLoading}
          aria-label="Sign in with Google"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        
        <Button
          variant="outline"
          className="border-gray-300 hover:bg-gray-50 text-gray-700"
          onClick={() => handleOAuthSignIn('facebook')}
          disabled={isLoading}
          aria-label="Sign in with Facebook"
        >
          <Facebook className="w-5 h-5 mr-2 text-blue-600" />
          Facebook
        </Button>
        
        <Button
          variant="outline"
          className="border-gray-300 hover:bg-gray-50 text-gray-700"
          onClick={() => handleOAuthSignIn('github')}
          disabled={isLoading}
          aria-label="Sign in with GitHub"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </Button>
      </div>
    </div>
  );
}