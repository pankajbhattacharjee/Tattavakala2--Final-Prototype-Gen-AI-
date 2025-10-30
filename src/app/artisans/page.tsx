
'use client';
import React, { Suspense } from 'react';
import MarketplaceHeader from '@/components/marketplace-header';
import { Loader } from 'lucide-react';
import ArtisansClientContent from '@/components/artisans-client-content';
import Footer from '@/components/footer';

// The page itself now just provides the Suspense boundary.
export default function ArtisansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-background min-h-screen">
          <MarketplaceHeader />
          <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader className="animate-spin h-8 w-8" /></div>}>
              <ArtisansClientContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
