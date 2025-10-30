
'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './product-card';
import { products as initialProducts } from '@/lib/products';
import type { Product } from './product-card';
import { categories } from '@/lib/categories';

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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState(categories[0]);


  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    const combinedProducts: Product[] = [...initialProducts];
    
    const initialIds = new Set(initialProducts.map(p => p.id));
    storedProducts.forEach((sp: Product) => {
      if (!initialIds.has(sp.id)) {
        combinedProducts.push(sp);
        if (!categories.includes(sp.type)) {
            categories.push(sp.type);
        }
      }
    });

    setAllProducts(combinedProducts.reverse());
  }, []);

  const getFilteredProducts = (category?: string) => {
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

          const categoryMatch = category ? product.type === category : true;

          return searchMatch && regionMatch && materialMatch && priceMatch && categoryMatch;
      });
  }

  return (
    <div>
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
