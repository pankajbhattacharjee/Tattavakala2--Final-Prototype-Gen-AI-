
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './product-card';
import { products } from '@/lib/products';

export default function ProductGrid() {
  const categories = ['Textiles', 'Pottery', 'Paintings', 'Jewelry'];
  const allProducts = [...products]; // Create a mutable copy

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
                <ProductCard key={product.id} product={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  category: product.category,
                  region: product.region,
                  price: product.price,
                  image: {
                    src: product.image.src,
                    hint: product.image.hint,
                  }
                }} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
