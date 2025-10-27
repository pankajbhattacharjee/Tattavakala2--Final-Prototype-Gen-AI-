'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './product-card';
import { products as initialProducts } from '@/lib/products';
import type { Product } from './product-card';


export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState(initialProducts as Product[]);

  useEffect(() => {
    try {
      const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      // Combine initial products with stored products, ensuring no duplicates from initial set
      const combinedProducts = [...initialProducts];
      const initialIds = new Set(initialProducts.map(p => p.id));
      storedProducts.forEach((sp: Product) => {
        if (!initialIds.has(sp.id)) {
          combinedProducts.push(sp);
        }
      });
      setAllProducts(combinedProducts);
    } catch (error) {
        console.error("Could not parse products from localStorage", error);
        setAllProducts(initialProducts as Product[]);
    }
  }, []);

  const categories = ['Textiles', 'Pottery', 'Paintings', 'Jewelry'];

  return (
    <div>
      <Tabs defaultValue="Textiles" className="w-full">
        <TabsList className="border-b border-border rounded-none bg-transparent p-0 h-auto mb-6 justify-start">
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
              {allProducts.filter(p => p.type === category).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
