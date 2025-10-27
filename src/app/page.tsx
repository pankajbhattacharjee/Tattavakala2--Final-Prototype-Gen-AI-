'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { signOut } from 'firebase/auth';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
];

export default function LandingPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const { user, isUserLoading } = useUser();
    const auth = useAuth();

    const handleLanguageChange = (langName: string) => {
        setCurrentLanguage(langName);
    };

    const handleAuthAction = () => {
        if (auth) {
            initiateGoogleSignIn(auth);
            setIsLoginModalOpen(false);
        }
    };

    const handleLogout = () => {
        if (auth) {
            signOut(auth);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="absolute top-0 left-0 right-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-gray-600 hover:text-primary">
                                <Globe className="mr-2 h-4 w-4" />
                                {currentLanguage}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {languages.map((lang) => (
                                <DropdownMenuItem key={lang.code} onSelect={() => handleLanguageChange(lang.name)}>
                                    {lang.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {user ? (
                         <Button variant="ghost" className="text-gray-600 hover:text-primary" onClick={handleLogout}>
                           <User className="mr-2 h-4 w-4" /> Log Out
                         </Button>
                    ) : (
                        <Button variant="ghost" className="text-gray-600 hover:text-primary" onClick={() => setIsLoginModalOpen(true)}>
                            <User className="mr-2 h-4 w-4" /> Log In
                        </Button>
                    )}
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center">
                     <div className="w-40 h-40 bg-white rounded-2xl shadow-lg flex-shrink-0 -mb-20 md:mb-0 md:-mr-20 z-10 relative"></div>
                    <div className="bg-white p-12 md:pl-28 md:pr-16 rounded-2xl shadow-lg text-center md:text-left w-full">
                        <h1 className="text-5xl md:text-6xl font-bold font-serif !leading-tight text-stone-800">
                            Join India's<br />Handcrafted<br />Revolution
                        </h1>
                        <div className="mt-8 flex items-center justify-center md:justify-start">
                            <div className="w-1 bg-red-400 h-16 mr-4"></div>
                            <p className="text-lg text-gray-600 max-w-sm">
                                A place where artisans share their craft and buyers discover culture in every piece.
                            </p>
                        </div>
                        <div className="mt-10">
                            <Button asChild size="lg" className="bg-primary rounded-full px-12 py-6 text-lg font-semibold hover:bg-primary/90 shadow-md transform hover:scale-105 transition-transform">
                                <Link href="/marketplace">GET STARTED</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Welcome Back</DialogTitle>
                        <DialogDescription>Sign in with your Google account to continue.</DialogDescription>
                    </DialogHeader>
                    <Button onClick={handleAuthAction} className="w-full">
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,2.659,29.324,0,24,0C10.745,0,0,10.745,0,24s10.745,24,24,24s24-10.745,24-24C48,22.641,46.13,20.5,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,2.659,29.324,0,24,0C16.318,0,9.656,4.981,6.306,14.691z"></path><path fill="#4CAF50" d="M24,48c5.643,0,10.74-2.182,14.732-5.734L32.534,34.93C30.22,36.65,27.261,38,24,38c-5.223,0-9.659-3.32-11.303-7.946l-6.571,4.819C9.656,43.019,16.318,48,24,48z"></path><path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l0.001-0.001l6.571,4.819C43.978,36.318,48,30.686,48,24C48,22.641,47.88,21.328,47.64,20H43.611z"></path></svg>
                        Continue with Google
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
