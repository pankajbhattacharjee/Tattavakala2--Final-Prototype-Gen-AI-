import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './product-card';
import { products } from '@/lib/products';

export default function ProductGrid() {
  const categories = ['Textiles', 'Pottery', 'Paintings', 'Jewelry'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <Tabs defaultValue="Textiles" className="w-full">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
              {products.filter(p => p.type === category).map((product) => (
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
