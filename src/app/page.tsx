
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
    
    const Logo = () => (
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACBgYHu7u4xMTEgICB4eHj8/PxYWFgoKCgwMDDExMSlpaXW1tYiIiJPT0+tra2fn587OztUVFRdXV0PDw+8vLzAwMCampoNDQ2ysrLLy8uQkJCbm5siIiLy8vJvb28WFhZGRkaenp5ISEimpqbS0tLf39+LMXeoAAAEkklEQVR4nO2dW3eiMBSGM5SiKC4qIq4K+v5vuQoECpIdOtnM5Ey87/9kE7qR3SSTBwKBQCAQCAQCgUAgEAgEAoG0kK4tV29t9g5kI6vta5tDXsO1xphw5C3YhM+whjE9DDt9i8wfa9+CE/iQYQ1X+MKY+g3b6jT+1LGtYfNtrBmhj2EbQ38Zp19jRoQ/YltDhx/hC4/aNw3e8GNs79C7Q2/YXqH3h72tQ++Hva9D9w88YNCDQ+99aYd/D39ah+gQ3q9D9w/0EPRhH7g99LPQB/0Yf0d6yIf+Gn9Wer4P/R7+tfScD/0n/r30vA/9T/yt9JwP/R/+Nf4O9OD/xt+Rnucf6M/4d6TnfQP9Mf+e9LxvQP+HvyM95xvQP+fvkJ7zDeiv+ff4O9AD/TN/R3rON9BP82+k53wD/TZ/R3rON9Dv82+k53wD/T7/JnqON9ADf3s99J0P/Pf0Wug7H/jR6TXQdz7wo9MLoO984EenvUDf+cCvTa+DvjOBS3pt9J0LvKb0sug7F7hL6sXQdy5wk9TLoe9c4Caph0PfusCnap+FvoOBm7R9FvoOBu7Rtj/0X/QMD9yj7b/Qu+gZHrhL+6/0LjoGR+7R9k/oXXQNDtyl/SP0LroGB27S9hnoOzC4VdsWoO9g4BatWwR9hws3aN0S6GvcuEFrl0Jf48YtWrsS+gx3btDaptDXuPEGrd0KfYk7t2idYugr3LhB6xZD3+DGDVq3EfoS9z+i9ejo2zV48aK9O0f/tEGvHt2j6N82ePHiRYv27h390ga9enS/ov/b4MWLFy3au3f0Txt06tH9i/5vghcvXrRo797R/w/Q6aP7Fv3fAD9evGjR3r2j/xtgw0f3Lfq/Afa8eNGivXtH/y9AdI/uW/T/AsT04kWL9u4d/b8A0T26b9H/DxDRixct2rt39P8DRPfo/kX/L0A0L160aO/e0f8NEL2j+xf9vwDRvHjRon17R/83QMyP7lv0/wLE8+JFi/btHf3fADH96L5F/29AHD9etGjf3tH/DRDTo/sW/b8AMb540aJ9e0f/N0Cmj+5b9P8CRIwXL9q3d/T/AsT40X2L/l+AyFixYfX2jv5fAA0/um/R/wtQ42LD6u0d/b8Amuqi+xb9v0A1LTYs397R/wuoiS66b9H/C6ibYgNh+/aO/l9AzXR136L/F6CbYgNh+/aO/l9AzXR136L/F6ArxQbC9u0d/b+AGuqi+xb9v0A3ig2E7ds7+n8BaqKL7lv0/wL0VmygbN/e0f8LqIkuum/R/wtQV7IBsX17R/8vQJ11dd+i/xegPmQDxPr2jv5fAE3U1X2L/l8AnZANiOvbe/p/AZqoq/sW/b8AOikbENe39/T/Amqkq/sW/b8AuiAbENe39/T/Aqqkq/sW/b8AuiAbENe39/T/Aqqkq/sW/b8AuiAbENe39/T/Amqsq/sW/b8AXZANiOvbe/p/AVWl6r5F/y9AF2QDxPr27R0CgUAgEAgEAoFAIBAIBFId/gF1qT3yS9GvXAAAAABJRU5ErkJggg==" x="0" y="0" width="100" height="100" />
      </svg>
    );


    return (
      <div className="bg-landing min-h-screen w-full font-sans text-white">
        {/* Header */}
        <header className="absolute top-0 right-0 p-6 w-full">
            <div className="container mx-auto flex justify-end items-center gap-4 md:gap-6">
                 <div className="group relative">
                    <a className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#402102] transition-opacity hover:opacity-70">
                        <Globe className="h-5 w-5 text-[#402102]" />
                        <span>{currentLanguage.split(' ')[0]}</span>
                    </a>
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block z-30">
                        {languages.map(lang => (
                            <a key={lang.code} href="#" onClick={() => handleLanguageChange(lang.name)} className="block px-4 py-2 text-sm text-[#402102] hover:bg-gray-100">{lang.name}</a>
                        ))}
                    </div>
                </div>
                {isUserLoading ? null : user ? (
                    <Button onClick={handleLogout} variant="outline" className="bg-transparent border-2 border-[#B07A2B] text-[#B07A2B] rounded-full h-auto px-5 py-2 text-base font-semibold hover:bg-[#B07A2B] hover:text-white">
                        Log Out
                    </Button>
                ) : (
                    <div className="flex items-center gap-4">
                        <a onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 cursor-pointer text-base font-semibold text-[#402102] transition-opacity hover:opacity-70">
                            <UserIcon className="h-6 w-6 text-[#402102]" />
                            Log In
                        </a>
                        <Button onClick={() => setIsSignUpModalOpen(true)} variant="default" className="bg-transparent border border-[#402102] text-[#402102] rounded-full h-auto px-5 py-2 text-base font-semibold hover:bg-[#402102] hover:text-white">
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </header>

        <div className="flex flex-col min-h-screen items-center justify-center">
            {/* Content Card */}
            <div className="relative w-11/12 max-w-4xl bg-white/75 rounded-2xl shadow-xl p-10 md:p-16 text-center backdrop-blur-sm mt-20">
                {/* Logo overlapping the card */}
                 <div className="absolute -top-12 left-1/2 md:left-16 transform -translate-x-1/2 md:-translate-x-1/2 w-24 h-24 bg-white/90 rounded-2xl shadow-2xl flex items-center justify-center p-3 backdrop-blur-sm">
                    <Logo />
                </div>
                
                <div className="mt-8 md:mt-0">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#402102] leading-tight mb-8">
                        Join India's Handcrafted Revolution
                    </h1>
                    <p className="relative text-base md:text-lg text-[#411313] italic leading-snug mb-12 max-w-md mx-auto">
                        A place where artisans share their craft and
                        buyers discover culture in every piece.
                    </p>
                </div>

                <div className="text-center">
                    <Button asChild size="lg" className="bg-gradient-to-r from-[#e87c69] to-[#f0987c] text-white font-bold text-lg rounded-full px-12 py-7 h-auto shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                        <Link href="/marketplace">GET STARTED</Link>
                    </Button>
                </div>
              </div>
        </div>

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

    