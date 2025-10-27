import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
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
      <body className={cn('font-sans antialiased', fontSans.variable, fontSerif.variable)}>
        <FirebaseClientProvider>
            {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
