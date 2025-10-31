'use client';

import { FirebaseClientProvider } from '@/firebase';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </FirebaseClientProvider>
  );
}
