import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background font-serif">
      <header className="absolute top-0 right-0 p-6">
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" className="text-foreground hover:bg-black/5">
            <Globe className="mr-2 h-4 w-4" />
            Language
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-black/5">
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <Button variant="outline" className="border-foreground/50 text-foreground hover:bg-black/5">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </nav>
      </header>

      <main className="flex flex-col items-center text-center">
        <div className="relative mb-[-50px] z-10">
            <div className="p-4 bg-card rounded-2xl shadow-lg">
                <Image
                    src="https://picsum.photos/seed/logo/100/100"
                    alt="Vishwa Tatva"
                    width={100}
                    height={100}
                    className="rounded-md"
                    data-ai-hint="logo artisan"
                />
            </div>
        </div>
        <Card className="w-full max-w-2xl text-center shadow-2xl rounded-2xl pt-20 pb-12 px-8">
          <CardContent className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Join India's Handcrafted Revolution
            </h1>
            <div className="flex items-center my-6">
              <div className="h-12 w-px bg-primary mr-4"></div>
              <p className="text-lg text-muted-foreground max-w-sm">
                A place where artisans share their craft and buyers discover culture in every piece.
              </p>
            </div>
            <Link href="/crafting-tale" passHref>
              <Button size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full">
                GET STARTED
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
