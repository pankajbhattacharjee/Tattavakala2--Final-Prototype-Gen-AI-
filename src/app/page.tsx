'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
];

export default function LandingPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('English');

    const handleLanguageChange = (langName: string) => {
        setCurrentLanguage(langName);
        // In a real app, you'd trigger a language change here
        console.log(`Language changed to ${langName}`);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center font-sans">
            {/* Background Image */}
            <Image
                src="/back4.png.jpg"
                alt="Handcrafted texture background"
                fill={true}
                className="-z-10 object-cover"
            />

            {/* Top Navigation */}
            <header className="absolute top-6 right-8 md:top-8 md:right-10 z-20">
                <div className="flex items-center gap-4 md:gap-8">
                     <div className="group relative">
                         <a className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#402102] transition-opacity hover:opacity-70">
                            <Globe className="h-5 w-5 text-[#4197ff]" />
                            <span>{currentLanguage.split(' ')[0]}</span>
                         </a>
                         <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
                            {languages.map(lang => (
                                <a key={lang.code} href="#" onClick={() => handleLanguageChange(lang.name)} className="block px-4 py-2 text-sm text-[#402102] hover:bg-gray-100">{lang.name}</a>
                            ))}
                         </div>
                    </div>
                    <a onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#402102] transition-opacity hover:opacity-70">
                        <UserIcon className="h-6 w-6 text-purple-700" />
                        Log In
                    </a>
                    <Button onClick={() => setIsSignupModalOpen(true)} variant="outline" className="hidden md:inline-flex bg-transparent border-2 border-[#402102] text-[#402102] rounded-full h-auto px-5 py-2 text-base font-semibold hover:bg-[#402102] hover:text-white">
                        Sign Up
                    </Button>
                </div>
            </header>

            {/* Main Content Card */}
            <main className="relative w-11/12 max-w-2xl bg-white/75 rounded-2xl shadow-xl p-12 pt-32 text-left animate-slide-up">
                {/* Logo */}
                <div className="absolute -top-10 -left-5 w-32 h-32 bg-white rounded-xl shadow-2xl flex items-center justify-center p-2">
                    <Image
                        src="/logo2.png"
                        alt="Tattvakala Logo"
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/120x120/ffffff/402102?text=Logo'; }}
                    />
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
                        <DialogTitle className="text-2xl text-center font-serif text-[#402102]">Log In</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" type="password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                         <Button variant="outline" onClick={() => setIsLoginModalOpen(false)} className="border-2 border-[#402102] text-[#402102] rounded-full px-6">Cancel</Button>
                         <Button onClick={() => setIsLoginModalOpen(false)} className="bg-gradient-to-r from-[#e87c69] to-[#f0987c] text-white rounded-full px-6">Log In</Button>
                    </div>
                </DialogContent>
            </Dialog>

             {/* Signup Modal */}
            <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
                <DialogContent className="sm:max-w-md bg-white p-10 rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center font-serif text-[#402102]">Sign Up</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input id="signup-name" placeholder="Enter your full name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" placeholder="Enter your email" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" placeholder="Create a password" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                         <Button variant="outline" onClick={() => setIsSignupModalOpen(false)} className="border-2 border-[#402102] text-[#402102] rounded-full px-6">Cancel</Button>
                         <Button onClick={() => setIsSignupModalOpen(false)} className="bg-gradient-to-r from-[#e87c69] to-[#f0987c] text-white rounded-full px-6">Sign Up</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
