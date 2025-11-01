
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { Providers } from './providers';


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
      <body className={cn('font-sans antialiased', fontSans.variable, fontSerif.variable)}>
        <Providers>
            {children}
            <Toaster />
        </Providers>
      </body>
    </html>
  );
}
