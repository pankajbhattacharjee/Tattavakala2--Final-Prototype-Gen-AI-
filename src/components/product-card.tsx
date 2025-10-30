
'use client';
import Image from 'next/image';
import { ShoppingCart, Zap, Share2, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';


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
  type: string;
};

type ProductCardProps = {
  product: Product;
  onCardClick?: () => void;
};

export default function ProductCard({ product, onCardClick }: ProductCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { id, name, price, image, region } = product;
    addToCart({ id, name, price, image, region });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { id, name, price, image, region } = product;
    addToCart({ id, name, price, image, region });
    router.push('/checkout');
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'pinterest') => {
      const shareUrl = window.location.origin + '/marketplace'; // A generic link to the marketplace
      const shareText = encodeURIComponent(`${product.name} - ${product.description}`);
      const shareImage = encodeURIComponent(product.image.src);

      let url = '';
      switch(platform) {
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareText}`;
              break;
          case 'twitter':
              url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;
              break;
          case 'pinterest':
              url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${shareImage}&description=${shareText}`;
              break;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
  }

  const handleCopyLink = () => {
      const link = window.location.origin + '/marketplace';
      navigator.clipboard.writeText(link).then(() => {
          toast({title: 'Link Copied!', description: 'Marketplace URL copied to clipboard.'});
      });
  }

  const openShareModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  }

  return (
    <>
      <Card 
        className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={onCardClick}
      >
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
            <Button variant="outline" size="sm" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2"/>
              Add to Cart
            </Button>
            <Button variant="default" size="sm" className="flex-1" onClick={handleBuyNow}>
              <Zap className="mr-2"/>
              Buy Now
            </Button>
            <Button variant="ghost" size="icon" onClick={openShareModal}>
              <Share2 />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Share "{product.name}"</DialogTitle>
                <DialogDescription>Choose a platform to share this product.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('pinterest')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 fill-current">
                        <title>Pinterest</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.027-.655 2.56-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.159-1.492-.695-2.433-2.878-2.433-4.646 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    <span className="text-sm">Pinterest</span>
                </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={handleCopyLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                    <span className="text-sm">Copy Link</span>
                </div>
            </div>
             <Button onClick={() => setIsShareModalOpen(false)} className="w-full">Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
