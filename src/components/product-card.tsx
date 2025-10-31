
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

  const handleSocialShare = (platform: 'facebook' | 'whatsapp' | 'instagram' | 'pinterest') => {
      const shareUrl = window.location.origin + '/marketplace'; // A generic link to the marketplace
      const shareText = encodeURIComponent(`${product.name} - ${product.description}`);
      const shareImage = encodeURIComponent(product.image.src);

      let url = '';
      switch(platform) {
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareText}`;
              break;
          case 'whatsapp':
              url = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`;
              break;
          case 'instagram':
              // Instagram doesn't have a direct share URL, so we'll copy to clipboard and show a message
              navigator.clipboard.writeText(`${decodeURIComponent(shareText)} ${shareUrl}`).then(() => {
                  toast({title: 'Copied to clipboard!', description: 'Paste this into Instagram to share.'});
                  // Open Instagram in a new tab
                  window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
              });
              return;
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
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('whatsapp')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 fill-current">
                        <title>WhatsApp</title>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('facebook')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 fill-current">
                        <title>Facebook</title>
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm">Facebook</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('instagram')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600 fill-current">
                        <title>Instagram</title>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm">Instagram</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md" onClick={() => handleSocialShare('pinterest')}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 fill-current">
                        <title>Pinterest</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.027-.655 2.56-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.159-1.492-.695-2.433-2.878-2.433-4.646 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    <span className="text-sm">Pinterest</span>
                </div>
            </div>
             <Button onClick={() => setIsShareModalOpen(false)} className="w-full">Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
