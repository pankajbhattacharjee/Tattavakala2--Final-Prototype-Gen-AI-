'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, User as UserIcon, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, useUser } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Footer from '@/components/footer';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
];

export default function LandingPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const { user, isUserLoading } = useUser();
    const auth = useAuth();

    const handleLanguageChange = (langName: string) => {
        setCurrentLanguage(langName);
        console.log(`Language changed to ${langName}`);
    };

    const handleAuthAction = () => {
        if (auth) {
            initiateGoogleSignIn(auth);
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(false);
        }
    };

    const handleLogout = () => {
        if (auth) {
            signOut(auth);
        }
    };

    return (
        <div className="bg-landing min-h-screen bg-cover bg-center">
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center bg-transparent">
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                                <Globe className="mr-2 h-4 w-4" />
                                {currentLanguage}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {languages.map((lang) => (
                                <DropdownMenuItem key={lang.code} onSelect={() => handleLanguageChange(lang.name)}>
                                    {lang.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                        <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white" onClick={() => setIsLoginModalOpen(true)}>
                            Login
                        </Button>
                    )}
                    <Button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>
                </div>
            </header>
            
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-center text-white px-4">
                    <div className="inline-block p-4 bg-black/30 backdrop-blur-sm rounded-xl">
                        <Image src="/logo.png" alt="Tattvakala Logo" width={100} height={100} className="mx-auto" />
                        <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight mt-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                            Tattvakala
                        </h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                            Authentic Handcrafted Treasures from India. Discover, connect, and empower artisans.
                        </p>
                    </div>
                    <div className="mt-8 flex justify-center gap-4 animate-slide-up">
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                            <Link href="/marketplace">Explore Marketplace <Store className="ml-2" /></Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/sell">Sell Your Art <UserIcon className="ml-2" /></Link>
                        </Button>
                    </div>
                </div>
            </main>

            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>Sign in with your Google account to continue.</DialogDescription>
                    </DialogHeader>
                    <Button onClick={handleAuthAction} className="w-full">
                        <i className="fab fa-google mr-2"></i> Continue with Google
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create an Account</DialogTitle>
                        <DialogDescription>Join our community of artisans and art lovers.</DialogDescription>
                    </DialogHeader>
                    <Button onClick={handleAuthAction} className="w-full">
                        <i className="fab fa-google mr-2"></i> Sign up with Google
                    </Button>
                </DialogContent>
            </Dialog>
            <Footer />
        </div>
    );
}
