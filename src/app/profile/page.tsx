
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MarketplaceHeader from '@/components/marketplace-header';
import { products } from '@/lib/products';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

const pastOrders = [
    {
        id: '123456',
        date: 'June 15, 2024',
        total: 3748,
        status: 'Delivered',
        items: products.slice(0,2)
    },
    {
        id: '123455',
        date: 'May 20, 2024',
        total: 1200,
        status: 'Delivered',
        items: [products[4]]
    }
]

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut(auth).then(() => {
            router.push('/');
        });
    };

    if (isUserLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }
    
    if (!user) {
        // Optionally, redirect to login page if user is not authenticated
        // For now, just showing a message.
         router.push('/');
         return null;
    }


  return (
    <div className="bg-background min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <Tabs defaultValue="orders" className="w-full">
            <TabsList>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                 <Card>
                    <CardHeader>
                        <CardTitle>Your Orders</CardTitle>
                        <CardDescription>View your past purchases and their status.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {pastOrders.map(order => (
                            <div key={order.id}>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-semibold">Order #{order.id}</h3>
                                        <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">Total: ₹{order.total.toLocaleString('en-IN')}</p>
                                        <p className="text-sm text-green-600 font-medium">{order.status}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <Image src={item.image.src} alt={item.name} width={64} height={64} className="rounded-md bg-muted"/>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <Separator className="mt-6"/>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="settings">
                 <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Manage your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.displayName || ''} />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user.email || ''} readOnly/>
                        </div>
                         <p className="text-sm text-muted-foreground">Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}.</p>
                        <div className="flex gap-4 pt-4">
                             <Button>Save Changes</Button>
                             <Button variant="outline" onClick={handleLogout}>Logout</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
