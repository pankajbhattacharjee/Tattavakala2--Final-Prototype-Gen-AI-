
import MarketplaceHeader from '@/components/marketplace-header';
import FiltersSidebar from '@/components/filters-sidebar';
import ProductGrid from '@/components/product-grid';

export default function MarketplacePage() {
  return (
    <div className="bg-background min-h-screen font-sans">
      <MarketplaceHeader />
      <div className="container mx-auto max-w-[1400px] flex flex-col lg:flex-row gap-8 px-4 py-8">
        <aside className="w-full lg:w-1/4">
          <FiltersSidebar />
        </aside>
        <main className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold mb-6 text-primary font-serif">Marketplace</h1>
          <ProductGrid />
        </main>
      </div>
       <footer className="bg-card py-8 px-[5%] mt-12 border-t">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-primary font-serif mb-4">Sell With Us (For Artisans)</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-primary"></i> Step 1: Upload craft photo.</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-primary"></i> Step 2: Add short description (AI enhances it).</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-primary"></i> Step 3: Auto-generate tags, prices, and story.</li>
              <li className="flex items-center gap-2"><i className="fas fa-check-circle text-primary"></i> Step 4: Preview how your product will look.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary font-serif mb-4">Community & Learning</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><i className="fas fa-book text-primary"></i> AI-curated articles about craft heritage.</li>
              <li className="flex items-center gap-2"><i className="fas fa-lightbulb text-primary"></i> "Did You Know?" section (AI facts about Indian art).</li>
              <li className="flex items-center gap-2"><i className="fas fa-star text-primary"></i> Artisan spotlight stories.</li>
              <li className="flex items-center gap-2"><i className="fas fa-comments text-primary"></i> Forum for artisans to discuss materials, pricing, etc.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary font-serif mb-4">About / Impact</h4>
            <p className="text-sm text-muted-foreground">Mission: "Preserving Heritage with Technology."</p>
            <p className="text-sm text-muted-foreground">Showcase artisans supported, sales made, and stories shared.</p>
            <p className="text-sm text-muted-foreground">Option for users to sponsor or donate to artisans.</p>
            <div className="flex gap-4 mt-4">
               <i className="fab fa-facebook-f text-muted-foreground hover:text-primary cursor-pointer"></i>
               <i className="fab fa-instagram text-muted-foreground hover:text-primary cursor-pointer"></i>
               <i className="fab fa-twitter text-muted-foreground hover:text-primary cursor-pointer"></i>
               <i className="fab fa-pinterest text-muted-foreground hover:text-primary cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t">
          © 2025 Tattvakala. All rights reserved. | Handcrafted with ❤ in India
        </div>
      </footer>
    </div>
  );
}

