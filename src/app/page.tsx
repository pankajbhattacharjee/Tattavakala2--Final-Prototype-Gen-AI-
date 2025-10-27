'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth, useUser } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

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
        <div className="bg-landing-page relative min-h-screen w-full flex items-center justify-center font-sans">
            {/* Top Navigation */}
            <header className="absolute top-6 right-8 md:top-8 md:right-10 z-20">
                <div className="flex items-center gap-4 md:gap-6">
                     <div className="group relative">
                         <a className="flex items-center gap-2 cursor-pointer text-base font-semibold text-white transition-opacity hover:opacity-70">
                            <Globe className="h-5 w-5 text-white" />
                            <span>{currentLanguage.split(' ')[0]}</span>
                         </a>
                         <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
                            {languages.map(lang => (
                                <a key={lang.code} href="#" onClick={() => handleLanguageChange(lang.name)} className="block px-4 py-2 text-sm text-[#402102] hover:bg-gray-100">{lang.name}</a>
                            ))}
                         </div>
                    </div>
                     {isUserLoading ? null : user ? (
                        <Button onClick={handleLogout} variant="outline" className="bg-transparent border-2 border-white text-white rounded-full h-auto px-5 py-2 text-base font-semibold hover:bg-white hover:text-[#402102]">
                            Log Out
                        </Button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button onClick={() => setIsSignUpModalOpen(true)} variant="default" className="bg-white text-[#402102] rounded-full h-auto px-5 py-2 text-base font-semibold hover:bg-opacity-80">
                                Sign Up
                            </Button>
                            <a onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 cursor-pointer text-base font-semibold text-white transition-opacity hover:opacity-70">
                                <UserIcon className="h-6 w-6 text-white" />
                                Log In
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Card */}
            <main className="relative w-11/12 max-w-2xl bg-white/75 rounded-2xl shadow-xl p-12 pt-32 text-left backdrop-blur-sm">
                {/* Logo */}
                <div className="absolute -top-10 -left-5 w-32 h-32 bg-white rounded-xl shadow-2xl flex items-center justify-center p-2">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAHxjcHJ0AAABeAAAACh3dHB0AAABoAAAAA5yWFlaAAABpAAAABRnWFlaAAABuAAAABRiWFlaAAABzAAAABRyVFJDAAAB2AAAACBjaGFkAAAB+AAAACxiVFJDAAAB2AAAACBnVFJDAAAB2AAAACBEZXNjAAAAAAAAABFsZW4gZGVzYwBlAG4AIABDAE8AUgBFAGwAIABQAGgAbwB0AG8ALQBQAGEAaQBuAHQAPAAAABhjcHlyaWdodABDAG8AcgBlAGwAIABDAH8AcgBwAG8AcgBhAHQAaQBvAG4AAAAAAABkZXNjAAAAAAAAABJNaWNyb3NvZnQgSUNDIENvbG9yIEFwcGVhcmFuY2UAAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikrLTc3OEGEquNkZW/BL/w" alt="Tattvakala Logo" />
                </div>

                <div className="md:pl-24">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#402102] leading-tight mb-8">
                        Join India's<br/>
                        <span className="md:pl-2">Handcrafted Revolution</span>
                    </h1>
                    <p className="relative text-base md:text-lg text-[#411313] italic leading-snug mb-12 pl-5
                                before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#e87c69] before:to-[#f0987c] before:rounded-sm">
                        A place where artisans share their craft and<br/>
                        buyers discover culture in every piece.
                    </p>
                </div>

                <div className="text-center">
                    <Button asChild size="lg" className="bg-gradient-to-r from-[#e87c69] to-[#f0987c] text-white font-bold text-lg rounded-full px-12 py-7 h-auto shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                        <Link href="/marketplace">GET STARTED</Link>
                    </Button>
                </div>
            </main>
            
            {/* Login Modal */}
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogContent className="sm:max-w-md bg-white p-10 rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center font-serif text-[#402102]">Welcome Back</DialogTitle>
                        <DialogDescription className="text-center">Sign in to continue to Tattvakala</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Button onClick={handleAuthAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                           <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.3 0 261.8 0 120.5 109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.4 72.4l-64 64c-22.6-21.6-54.2-34.6-90.4-34.6-72.3 0-131.2 58.9-131.2 131.2s58.9 131.2 131.2 131.2c79.9 0 119.8-53.9 124.9-82.9H244v-87.5h235.9c2.3 12.7 3.7 26.1 3.7 40.2z"></path></svg>
                            Sign in with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Sign Up Modal */}
            <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
                <DialogContent className="sm:max-w-md bg-white p-10 rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center font-serif text-[#402102]">Create an Account</DialogTitle>
                        <DialogDescription className="text-center">Join Tattvakala to discover unique handcrafted treasures.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Button onClick={handleAuthAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                           <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.3 0 261.8 0 120.5 109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.4 72.4l-64 64c-22.6-21.6-54.2-34.6-90.4-34.6-72.3 0-131.2 58.9-131.2 131.2s58.9 131.2 131.2 131.2c79.9 0 119.8-53.9 124.9-82.9H244v-87.5h235.9c2.3 12.7 3.7 26.1 3.7 40.2z"></path></svg>
                            Sign up with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
