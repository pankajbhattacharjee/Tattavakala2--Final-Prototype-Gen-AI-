
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketplaceHeader from '@/components/marketplace-header';
import { products as initialProducts } from '@/lib/products';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

type Product = (typeof initialProducts)[0];

type StoryProduct = Product & {
  storyTitle: string;
  storyContent: string;
};

export default function StoriesPage() {
  const [stories, setStories] = useState<StoryProduct[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryProduct | null>(null);

  useEffect(() => {
    // Combine initial products with products from local storage
    const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const combinedProducts: Product[] = [...initialProducts];
    const initialIds = new Set(initialProducts.map(p => p.id));
    
    storedProducts.forEach(sp => {
      if (!initialIds.has(sp.id)) {
        combinedProducts.push(sp);
      }
    });

    const generatedStories = combinedProducts.map(p => ({
      ...p,
      storyTitle: `The Art of ${p.name}`,
      storyContent: `Discover the rich heritage and meticulous craftsmanship behind the ${p.name}. Each piece is a testament to the generations of artisans from ${p.region} who have perfected this beautiful ${p.category} technique. ${p.description}`
    }));

    setStories(generatedStories);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Stories & Heritage</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Har sringar prachin hai, naye pehchan banate hai. (Every adornment is ancient, creating new identities.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setSelectedStory(story)}>
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                  <Image src={story.image.src} alt={story.name} fill={true} objectFit="cover" data-ai-hint={story.image.hint} />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{story.storyTitle}</CardTitle>
                <CardDescription className="line-clamp-3">{story.storyContent}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedStory} onOpenChange={(isOpen) => !isOpen && setSelectedStory(null)}>
        <DialogContent className="max-w-4xl">
          {selectedStory && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedStory.storyTitle}</DialogTitle>
                <DialogDescription className="text-md pt-2">{selectedStory.region} | {selectedStory.category}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="relative aspect-square">
                  <Image src={selectedStory.image.src} alt={selectedStory.name} fill={true} objectFit="cover" className="rounded-lg" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">{selectedStory.storyContent}</p>
                  <h3 className="font-bold text-lg mb-2">Product Details</h3>
                  <p className="text-sm mb-4">{selectedStory.description}</p>
                  <div className="flex items-center justify-between">
                     <Badge variant="secondary" className="text-xl font-bold text-primary bg-primary/10 border-primary/20">
                        ₹{selectedStory.price.toLocaleString('en-IN')}
                    </Badge>
                     <Button>
                        <ShoppingCart className="mr-2" />
                        Add to Cart
                     </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
