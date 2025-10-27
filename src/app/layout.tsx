import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Taviraj, Sorts_Mill_Goudy } from 'next/font/google';

const headingFont = Sorts_Mill_Goudy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-heading',
});

const bodyFont = Taviraj({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Vishwa Tatva',
  description: "Join India's Handcrafted Revolution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen', headingFont.variable, bodyFont.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
