
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const { user } = useUser();
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
    <div className="relative min-h-screen w-full bg-landing text-[#6B4F4B]">
      <div className="absolute inset-0 bg-black/10"></div>
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                <Globe className="mr-2 h-4 w-4" />
                {currentLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onSelect={() => handleLanguageChange(lang.name)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" onClick={handleLogout}>
              <User className="mr-2 h-4 w-4" /> Log Out
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <User className="mr-2 h-4 w-4" /> Log In
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>
      
      <main className="relative z-0 flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-2xl">
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-1/2 z-20"
          >
            <div className="relative w-32 h-32 md:w-36 md:h-36 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/ai-app-creator-5a195.appspot.com/o/templates%2F58756306-0811-4048-9366-511488c0373c%2Flogo.png?alt=media&token=c19989b5-f43b-413e-812f-9372338902d1"
                alt="Tattvakala Logo"
                width={144}
                height={144}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm pt-24 pb-12 px-8 sm:px-12 rounded-2xl shadow-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-stone-800 !leading-tight">
              Join India's Handcrafted Revolution
            </h1>
            <div className="mt-8 flex items-center justify-center">
              <div className="w-px h-10 bg-orange-400 mr-4"></div>
              <p className="text-lg text-gray-600 max-w-md">
                A place where artisans share their craft and buyers discover culture in every piece.
              </p>
            </div>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-[#D98468] text-white rounded-full px-12 py-7 text-lg font-semibold hover:bg-[#C97458] shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/marketplace">GET STARTED</Link>
              </Button>
            </div>
          </div>
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
          <Button onClick={handleAuthAction} className="w-full">
             <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,2.659,29.324,0,24,0C10.745,0,0,10.745,0,24s10.745,24,24,24s24-10.745,24-24C48,22.641,46.13,20.5,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,2.659,29.324,0,24,0C16.318,0,9.656,4.981,6.306,14.691z"></path><path fill="#4CAF50" d="M24,48c5.643,0,10.74-2.182,14.732-5.734L32.534,34.93C30.22,36.65,27.261,38,24,38c-5.223,0-9.659-3.32-11.303-7.946l-6.571,4.819C9.656,43.019,16.318,48,24,48z"></path><path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l0.001-0.001l6.571,4.819C43.978,36.318,48,30.686,48,24C48,22.641,47.88,21.328,47.64,20H43.611z"></path></svg>
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

