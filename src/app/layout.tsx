
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Playfair_Display, Roboto } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';

const bodyFont = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
});

const headingFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Tattvakala',
  description: 'Authentic Handcrafted Treasures',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={cn('font-body antialiased', bodyFont.variable, headingFont.variable)}>
        <FirebaseClientProvider>
            {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

    