
'use client';
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketplaceHeader from '@/components/marketplace-header';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/components/product-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Footer from '@/components/footer';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { products as initialProducts } from '@/lib/products';


type StoryProduct = Product & {
  storyTitle: string;
  storyContent: string;
};

function StoriesContent() {
  const [stories, setStories] = useState<StoryProduct[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryProduct | null>(null);
  const { addToCart } = useCart();
  const firestore = useFirestore();
  const productsCollectionRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'products');
  }, [firestore]);
  const { data: firestoreProducts, isLoading } = useCollection<Product>(productsCollectionRef);

  const allProducts = useMemo(() => {
    const combinedProducts = [...initialProducts];
    if (firestoreProducts) {
        const initialProductIds = new Set(initialProducts.map(p => p.id));
        firestoreProducts.forEach(fp => {
            if (!initialProductIds.has(fp.id)) {
                combinedProducts.push(fp);
            }
        });
    }
    return combinedProducts;
  }, [firestoreProducts]);


  useEffect(() => {
    if (allProducts) {
        const generatedStories = allProducts.map(p => ({
        ...p,
        storyTitle: `The Art of ${p.name}`,
        storyContent: `Discover the rich heritage and meticulous craftsmanship behind the ${p.name}. Each piece is a testament to the generations of artisans from ${p.region} who have perfected this beautiful ${p.category} technique. ${p.description}`
        }));
        setStories(generatedStories.reverse());
    }
  }, [allProducts]);
  
  const handleAddToCart = (product: StoryProduct) => {
    const { id, name, price, image, region } = product;
    addToCart({ id, name, price, image, region });
  }

  if (isLoading && stories.length === 0) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8" />
        </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Stories & Heritage</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the stories behind authentic handcrafted treasures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          story.image && (
            <Card key={story.id} className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setSelectedStory(story)}>
                <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                    <Image src={story.image.src} alt={story.name} fill={true} style={{objectFit:"cover"}} data-ai-hint={story.image.hint} />
                </div>
                </CardHeader>
                <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold mb-2">{story.storyTitle}</CardTitle>
                <CardDescription className="line-clamp-3">{story.storyContent}</CardDescription>
                </CardContent>
            </Card>
          )
        ))}
      </div>

      <Dialog open={!!selectedStory} onOpenChange={(isOpen) => !isOpen && setSelectedStory(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          {selectedStory && selectedStory.image && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedStory.storyTitle}</DialogTitle>
                <DialogDescription className="text-md pt-2">{selectedStory.region} | {selectedStory.category}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 overflow-hidden flex-grow">
                <div className="relative aspect-square">
                  <Image src={selectedStory.image.src} alt={selectedStory.name} fill={true} style={{objectFit:"cover"}} className="rounded-lg" />
                </div>
                <ScrollArea className="h-full">
                  <div className="pr-4">
                    <p className="text-muted-foreground mb-4">{selectedStory.storyContent}</p>
                    <h3 className="font-bold text-lg mb-2">Product Details</h3>
                    <p className="text-sm mb-4">{selectedStory.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                       <Badge variant="secondary" className="text-xl font-bold text-primary bg-primary/10 border-primary/20">
                          ₹{selectedStory.price.toLocaleString('en-IN')}
                      </Badge>
                       <Button onClick={() => handleAddToCart(selectedStory)}>
                          <ShoppingCart className="mr-2" />
                          Add to Cart
                       </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-background min-h-screen">
          <Suspense fallback={<div><div className="h-20"></div><div className="flex justify-center items-center h-64"><Loader className="animate-spin h-8 w-8" /></div></div>}>
            <MarketplaceHeader />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <StoriesContent />
            </div>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
