
import Image from 'next/image';
import { ShoppingCart, Zap, Share2, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type Product = {
  id: string;
  name: string;
  artisanName?: string;
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
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative bg-muted aspect-square w-full overflow-hidden">
          <Image 
            src={product.image.src} 
            alt={product.name} 
            fill={true}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
            data-ai-hint={product.image.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-serif font-semibold mb-2">{product.name}</CardTitle>
        {product.artisanName && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <User className="h-4 w-4 mr-2" />
            <span>{product.artisanName}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 h-[2.5em]">{product.description}</p>
        <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-foreground">{product.category} | {product.region}</p>
            <Badge variant="default" className="text-base font-bold">
                ₹{product.price.toLocaleString('en-IN')}
            </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         <div className="flex items-center gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <ShoppingCart className="mr-2"/>
            Add to Cart
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            <Zap className="mr-2"/>
            Buy Now
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
