
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';
import MarketplaceHeader from '@/components/marketplace-header';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Define the type for a product in the cart
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: { src: string };
  region: string;
  quantity: number;
}

// Define the type for the CartContext value
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantityToAdd?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantityToAdd: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
        toast({
          title: "Cart Updated!",
          description: `${product.name} quantity updated to ${existingItem.quantity + quantityToAdd}.`,
        });
        return updatedItems;
      } else {
        const newItem = { ...product, quantity: quantityToAdd };
        toast({
          title: "Added to Cart!",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      toast({
        title: "Item Removed!",
        description: "Product has been removed from your cart.",
      });
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId); // Remove if quantity is 0 or less
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared!",
      description: "Your shopping cart is now empty.",
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


function CartPageContents() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05; // 5% tax
  const total = subtotal + taxes;

  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription className="mt-2 mb-6">Looks like you haven't added anything to your cart yet.</CardDescription>
            <Button asChild>
              <Link href="/marketplace">Start Shopping</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden">
                    <Image src={item.image.src} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow ml-4">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">{item.region}</p>
                    <p className="text-lg font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-20 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes (5%)</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
    return (
        <CartProvider>
            <CartPageContents />
        </CartProvider>
    )
}
