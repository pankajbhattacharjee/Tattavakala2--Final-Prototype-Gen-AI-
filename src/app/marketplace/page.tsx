
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

function PageWithHeader() {
  return (
    <>
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MarketplaceContent />
      </div>
    </>
  );
}

export default function MarketplacePage() {
  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Loader className="animate-spin h-8 w-8" /></div>}>
        <PageWithHeader />
      </Suspense>
    </div>
  );
}
