
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, User as UserIcon } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="relative min-h-screen w-full bg-landing text-foreground">
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-foreground hover:bg-black/5">
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
                <Button variant="ghost" className="text-foreground hover:bg-black/5" onClick={handleLogout}>
                  <UserIcon className="mr-2 h-4 w-4" /> Log Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:bg-black/5"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" /> Log In
                  </Button>
                  <Button
                    variant="outline"
                    className="border-foreground/50 text-foreground hover:bg-foreground/5"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
        </div>
      </header>
      
      <main className="relative z-0 flex items-center justify-center min-h-screen p-4">
        <Card className="relative w-full max-w-3xl bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
            <CardContent className="p-0 flex flex-col md:flex-row items-start gap-8">
                <div className="relative -mt-24 -ml-4 md:-ml-20 shrink-0">
                    <div className="bg-card p-2 rounded-2xl shadow-lg">
                        <Image
                            src="https://res.cloudinary.com/dpkhf4cf5/image/upload/v1761622049/logo.svg_bccelj.png"
                            alt="Tattvakala Logo"
                            width={120}
                            height={120}
                            className="rounded-xl"
                        />
                    </div>
                </div>

                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary !leading-tight drop-shadow-sm">
                      Join India's Handcrafted Revolution
                    </h1>
                    
                    <div className="flex my-6">
                        <div className="flex items-start gap-3">
                             <div className="w-px h-12 bg-destructive/50 mt-1"></div>
                             <p className="text-left text-muted-foreground text-base">
                               A place where artisans share their craft and buyers discover culture in every piece.
                             </p>
                        </div>
                    </div>

                    <div className="mt-8">
                      <Button asChild size="lg" className="bg-destructive text-destructive-foreground rounded-full px-12 py-7 text-lg font-semibold hover:bg-destructive/90 shadow-lg transform hover:scale-105 transition-transform">
                        <Link href="/marketplace">GET STARTED</Link>
                      </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
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
