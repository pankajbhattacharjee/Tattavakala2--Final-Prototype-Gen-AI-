import Image from 'next/image';
import { ShoppingCart, Zap, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  price: number;
  image: {
    src: string;
    hint: string;
  };
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative bg-muted aspect-square w-full flex items-center justify-center">
          <Image src={product.image.src} alt={product.name} width={300} height={300} className="object-cover w-full h-full" data-ai-hint={product.image.hint} />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <p className="text-sm font-medium text-foreground">{product.category} | {product.region}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
         <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ShoppingCart />
            Add to Cart
          </Button>
          <Button variant="default" size="sm">
            <Zap />
            Buy Now
          </Button>
          <Button variant="ghost" size="icon" className="w-auto px-2">
            <Share2 />
            <span className="ml-2 hidden sm:inline">Share</span>
          </Button>
        </div>
        <Badge variant="secondary" className="text-base font-bold text-primary bg-primary/10 border-primary/20">
          ₹{product.price.toLocaleString('en-IN')}
        </Badge>
      </CardFooter>
    </Card>
  );
}
