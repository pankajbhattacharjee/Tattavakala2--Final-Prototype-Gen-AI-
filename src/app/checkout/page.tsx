
'use client';
import React, { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketplaceHeader from '@/components/marketplace-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreditCard, Home, CheckCircle, Loader } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/footer';
import { useUser } from '@/firebase';
import { placeOrder } from '../actions';
import { useToast } from '@/hooks/use-toast';

function CheckoutContent() {
  const [currentStep, setCurrentStep] = useState('address');
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleNext = (step: string) => {
    setCurrentStep(step);
  };
  
  const handlePlaceOrder = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "Please log in to place an order.",
        });
        return;
    }
    setIsProcessing(true);
    try {
        const result = await placeOrder(user.email);
        if (result.success) {
            setIsOrderComplete(true);
        } else {
            toast({
                variant: "destructive",
                title: "Order Failed",
                description: result.message || "Could not place your order. Please try again.",
            });
        }
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        });
    } finally {
        setIsProcessing(false);
    }
  }

 if (isOrderComplete) {
      return (
        <div className="flex items-center justify-center" style={{minHeight: 'calc(100vh - 80px)'}}>
            <Card className="max-w-md text-center p-8">
              <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600"/>
                </div>
                <CardTitle className="text-2xl mt-4">Order Placed Successfully!</CardTitle>
                <CardDescription>Thank you for your purchase. A confirmation email has been sent to {user?.email}.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">You will receive an email confirmation shortly.</p>
                 <Button asChild>
                    <Link href="/marketplace">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
      );
  }

  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        <div className="max-w-2xl mx-auto">
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="address" onClick={() => setCurrentStep('address')}><Home className="mr-2"/>Shipping</TabsTrigger>
              <TabsTrigger value="payment" onClick={() => setCurrentStep('payment')} disabled={currentStep !== 'payment'}><CreditCard className="mr-2"/>Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>Enter your shipping details below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Mumbai"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="Maharashtra" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">PIN Code</Label>
                        <Input id="zip" placeholder="400001"/>
                    </div>
                  </div>
                   <Button onClick={() => handleNext('payment')} className="w-full">Continue to Payment</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Enter your payment details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <Button onClick={handlePlaceOrder} className="w-full" disabled={isProcessing}>
                    {isProcessing ? <Loader className="animate-spin" /> : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}

export default function CheckoutPage() {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="bg-background min-h-screen">
            <Suspense fallback={<div><div className="h-20"></div><div className="flex justify-center items-center h-64"><Loader className="animate-spin h-8 w-8" /></div></div>}>
              <MarketplaceHeader />
              <CheckoutContent/>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
  );
}
