import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LoadingProvider } from '@/contexts/loading-context';
import { AuthProvider } from '@/components/auth/auth-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'ekaBrahmaa - Ancient Ayurveda for Modern Healing',
  description: 'Discover your unique healing path through personalized Ayurveda. Connect with expert healers, understand your constitution, and transform your well-being.',
  keywords: 'Ayurveda, healing, wellness, Prakriti, constitution, holistic health, traditional medicine',
  authors: [{ name: 'ekaBrahmaa' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3c7f87',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ekabrahmaa.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ekaBrahmaa - Ancient Ayurveda for Modern Healing',
    description: 'Discover your unique healing path through personalized Ayurveda.',
    siteName: 'ekaBrahmaa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ekaBrahmaa - Ancient Ayurveda for Modern Healing'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ekaBrahmaa - Ancient Ayurveda for Modern Healing',
    description: 'Discover your unique healing path through personalized Ayurveda.',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}