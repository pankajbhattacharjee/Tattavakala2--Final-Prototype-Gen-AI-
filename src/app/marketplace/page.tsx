
'use client';
import { useSearchParams } from 'next/navigation';
import MarketplaceHeader from '@/components/marketplace-header';
import FiltersSidebar from '@/components/filters-sidebar';
import ProductGrid from '@/components/product-grid';

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <FiltersSidebar />
          </aside>
          <main className="lg:col-span-3">
            <ProductGrid searchQuery={searchQuery} />
          </main>
        </div>
      </div>
    </div>
  );
}
