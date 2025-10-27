
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MarketplaceHeader from '@/components/marketplace-header';
import Link from 'next/link';
import { ArrowRight, Sparkles, Store, Users } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { products } from '@/lib/products';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />

      {/* Hero Section */}
      <section className="relative bg-secondary/30 py-20 md:py-32">
         <div
            className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge variant="outline" className="mb-4 text-sm font-medium text-primary border-primary/50">
            <Sparkles className="mr-2 h-4 w-4 text-primary/80" />
            Preserving Heritage with Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
            Authentic Indian Craftsmanship
          </h1>
          <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover unique, handcrafted treasures from artisans across India. Each piece tells a story of tradition, skill, and cultural heritage.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/marketplace">
                Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sell">
                Sell Your Craft <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
                <Store className="h-8 w-8 text-primary"/>
                <h2 className="text-3xl font-serif font-bold text-gray-800">Featured Crafts</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>

      {/* Why Tattvakala Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                 <h2 className="text-3xl font-serif font-bold text-gray-800">Why Tattvakala?</h2>
                 <p className="mt-2 max-w-xl mx-auto text-muted-foreground">We are more than just a marketplace; we are a community dedicated to preserving art and empowering artisans.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               <div className="p-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                        <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Authentic & Handcrafted</h3>
                    <p className="text-muted-foreground">Every product is sourced directly from skilled artisans, ensuring authenticity and quality.</p>
               </div>
                <div className="p-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                        <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Empowering Artisans</h3>
                    <p className="text-muted-foreground">We provide a platform for artisans to reach a global audience and earn a fair price for their work.</p>
               </div>
               <div className="p-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                        <Sparkles className="h-8 w-8"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Storytelling</h3>
                    <p className="text-muted-foreground">Our tools help artisans share the rich history and process behind their creations with the world.</p>
               </div>
            </div>
         </div>
      </section>

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

// Re-using Badge component structure from a previous implementation if available, or define locally.
const Badge = ({className, children, ...props}: React.HTMLAttributes<HTMLDivElement> & {variant?:'outline'}) => (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
        {children}
    </div>
)
