
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './product-card';
import type { Product } from './product-card';
import { products as initialProducts } from '@/lib/products';
import { categories } from '@/lib/categories';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';


type Filters = {
  region: string[];
  material: string[];
  price: string[];
};

type ProductGridProps = {
    searchQuery?: string;
    filters: Filters;
};

const priceRangeToValue = (range: string) => {
    switch (range) {
        case "Under ₹500": return { min: 0, max: 499.99 };
        case "₹500 - ₹1500": return { min: 500, max: 1500 };
        case "₹1500 - ₹3000": return { min: 1500.01, max: 3000 };
        case "Above ₹3000": return { min: 3000.01, max: Infinity };
        default: return null;
    }
}

export default function ProductGrid({ searchQuery = '', filters }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const firestore = useFirestore();
  const productsCollectionRef = collection(firestore, 'products');
  const { data: allProducts, isLoading } = useCollection<Product>(productsCollectionRef);


  const getFilteredProducts = (category?: string) => {
      if (!allProducts) return [];
      const activeCategory = category || activeTab;
      return allProducts.filter(product => {
          const searchMatch =
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.region.toLowerCase().includes(searchQuery.toLowerCase());
          
          const regionMatch = filters.region.length === 0 || filters.region.includes(product.region);
          
          const materialMatch = filters.material.length === 0 || filters.material.includes(product.category) || filters.material.includes(product.type);

          const priceMatch = filters.price.length === 0 || filters.price.some(range => {
              const priceLimits = priceRangeToValue(range);
              if (!priceLimits) return false;
              return product.price >= priceLimits.min && product.price <= priceLimits.max;
          });

          const categoryMatch = product.type === activeCategory;

          return searchMatch && regionMatch && materialMatch && priceMatch && categoryMatch;
      });
  }
  
  const handleAddToCart = (product: Product) => {
    const { id, name, price, image, region } = product;
    addToCart({ id, name, price, image, region });
    setSelectedProduct(null);
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-border rounded-none bg-transparent p-0 h-auto mb-6 justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none text-muted-foreground font-semibold px-4 pb-2"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {getFilteredProducts(category).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onCardClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedProduct} onOpenChange={(isOpen) => !isOpen && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{`The Art of ${selectedProduct.name}`}</DialogTitle>
                <DialogDescription className="text-md pt-2">{selectedProduct.region} | {selectedProduct.category}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 overflow-hidden flex-grow">
                <div className="relative aspect-square">
                  <Image src={selectedProduct.image.src} alt={selectedProduct.name} fill={true} style={{objectFit:"cover"}} className="rounded-lg" />
                </div>
                <ScrollArea className="h-full">
                  <div className="pr-4">
                    <p className="text-muted-foreground mb-4">{`Discover the rich heritage and meticulous craftsmanship behind the ${selectedProduct.name}. Each piece is a testament to the generations of artisans from ${selectedProduct.region} who have perfected this beautiful ${selectedProduct.category} technique. ${selectedProduct.description}`}</p>
                    <h3 className="font-bold text-lg mb-2">Product Details</h3>
                    <p className="text-sm mb-4">{selectedProduct.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                       <Badge variant="secondary" className="text-xl font-bold text-primary bg-primary/10 border-primary/20">
                          ₹{selectedProduct.price.toLocaleString('en-IN')}
                      </Badge>
                       <Button onClick={() => handleAddToCart(selectedProduct)}>
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
