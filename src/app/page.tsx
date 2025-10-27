
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MarketplaceHeader from '@/components/marketplace-header';
import { ArrowRight, Brush, Gem, ShoppingCart } from 'lucide-react';
import { products } from '@/lib/products';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LandingPage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <Image 
          src="https://picsum.photos/seed/hero/1600/900" 
          alt="Artisanal crafts" 
          fill={true}
          objectFit="cover"
          className="z-0 brightness-50"
          data-ai-hint="handcrafted pottery"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Tattvakala</h1>
          <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
            Authentic Handcrafted Treasures from the Heart of India.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/marketplace">
              Explore the Marketplace <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Tattvakala?</h2>
            <p className="text-muted-foreground mt-2">Discover the soul of Indian craftsmanship.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Brush className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Unique Handicrafts</h3>
              <p className="text-muted-foreground mt-2">
                Every item is handmade with love and tells a unique story of its origin.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Support Artisans</h3>
              <p className="text-muted-foreground mt-2">
                Your purchase directly empowers local artisans and their communities.
              </p>
            </div>
            <div className="text-center">
               <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Seamless Shopping</h3>
              <p className="text-muted-foreground mt-2">
                Enjoy a secure and easy checkout process with worldwide shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground mt-2">Handpicked treasures just for you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                        <div className="relative aspect-square w-full">
                            <Image src={product.image.src} alt={product.name} fill={true} objectFit="cover" data-ai-hint={product.image.hint} />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.region}</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="font-bold text-primary text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                            <Button variant="outline" size="sm">Add to Cart</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                    <Link href="/marketplace">View All Products</Link>
                </Button>
            </div>
        </div>
      </section>
      
    </div>
  );
}
