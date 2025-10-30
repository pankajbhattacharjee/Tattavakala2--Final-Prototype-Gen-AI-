
'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MarketplaceHeader from '@/components/marketplace-header';
import FiltersSidebar from '@/components/filters-sidebar';
import ProductGrid from '@/components/product-grid';
import { Loader } from 'lucide-react';

type Filters = {
  region: string[];
  material: string[];
  price: string[];
};

// This component uses useSearchParams and must be wrapped in Suspense
function MarketplaceContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    region: [],
    material: [],
    price: [],
  });

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setSelectedFilters(prev => {
      const newValues = prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: newValues };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="hidden lg:block">
        <FiltersSidebar 
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </aside>
      <main className="lg:col-span-3">
        <ProductGrid searchQuery={searchQuery} filters={selectedFilters} />
      </main>
    </div>
  );
}

// A new wrapper component to contain the Suspense boundary and the content
function MarketplacePageWithSuspense() {
  return (
    <>
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader className="animate-spin h-8 w-8" /></div>}>
            <MarketplaceContent />
          </Suspense>
      </div>
    </>
  );
}

// The main export for the page
export default function MarketplacePage() {
  return (
    <div className="bg-background min-h-screen">
      <MarketplacePageWithSuspense />
    </div>
  );
}
