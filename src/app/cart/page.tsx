
'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MarketplaceHeader from '@/components/marketplace-header';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

// The cart will now be initially empty.
const cartItems: any[] = [];

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + shipping;

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <div className="space-y-6">
                    {cartItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className="flex items-center gap-4 p-6">
                                <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                                    <Image src={item.image.src} alt={item.name} fill={true} style={{objectFit:"cover"}} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.region}</p>
                                    <p className="text-lg font-semibold mt-2">₹{item.price.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="flex items-center border rounded-md">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Minus className="h-4 w-4"/></Button>
                                    <Input type="number" value={item.quantity} className="h-8 w-12 text-center border-x border-y-0 rounded-none focus-visible:ring-0" readOnly/>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="h-4 w-4"/></Button>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </div>
                            {index < cartItems.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                    </div>
                </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString('en-IN')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        ) : (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/marketplace">Start Shopping</Link>
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}
