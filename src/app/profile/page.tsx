'use client';
import React, { useState } from 'react';
import { Auth, signOut } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import MarketplaceHeader from '@/components/marketplace-header';
import Footer from '@/components/footer';

const ProfilePage = () => {
    const auth = useAuth() as Auth | null;
    const { user, isUserLoading } = useUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const { toast } = useToast();


    const handleGoogleSignInButtonClick = async () => {
        if (!auth) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Authentication service not available.',
            });
            return;
        }

        setIsAuthLoading(true);
        try {
            const userCredential = await initiateGoogleSignIn(auth);
            console.log('Google Sign-In successful for user:', userCredential.user.uid);
            setIsLoginModalOpen(false);
        } catch (error: any) {
            // Gracefully handle popup-closed-by-user, which is not a true "error".
            if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
                 console.error('Authentication process ended or failed:', error.code, error.message);
                 toast({
                    variant: 'destructive',
                    title: 'Sign-in Failed',
                    description: 'Could not sign in with Google. Please try again.',
                });
            }
        } finally {
            setIsAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        if (auth) {
            try {
                await signOut(auth);
                console.log("User logged out successfully.");
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    };

    if (isUserLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin h-8 w-8" />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen">
                <MarketplaceHeader />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                        <p className="text-muted-foreground mb-6">You need to be logged in to view this page.</p>
                        <Button onClick={() => setIsLoginModalOpen(true)}>Log In / Sign Up</Button>
                    </div>
                </main>
                 <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Welcome</DialogTitle>
                            <DialogDescription>
                                Sign in or create an account to continue.
                            </DialogDescription>
                        </DialogHeader>
                         <Button
                            onClick={handleGoogleSignInButtonClick}
                            className="w-full"
                            disabled={isAuthLoading}
                        >
                            {isAuthLoading ? <Loader className="animate-spin" /> : 'Continue with Google'}
                        </Button>
                    </DialogContent>
                </Dialog>
                <Footer />
            </div>
        );
    }


    return (
        <div className="flex flex-col min-h-screen">
             <MarketplaceHeader />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">My Profile</h1>
                    <div className="space-y-4">
                        <p><strong>Name:</strong> {user.displayName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>UID:</strong> {user.uid}</p>
                    </div>
                    <Button onClick={handleLogout} className="mt-6">Log Out</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
