
import Link from 'next/link';
import { Search, ShoppingCart, User, Users, Menu, Handshake, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function MarketplaceHeader() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto max-w-[1400px] flex items-center justify-between h-20 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-3xl font-bold text-primary font-serif tracking-wide">
            Tattvakala
          </Link>
          <p className="hidden lg:block text-sm text-muted-foreground italic border-l pl-4 ml-4">
            Authentic Handcrafted Treasures
          </p>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/artisans" className="text-sm font-medium hover:text-primary transition-colors">
              Artisans Community
            </Link>
            <Link href="/stories" className="text-sm font-medium hover:text-primary transition-colors">
              Stories & Heritage
            </Link>
          </nav>
          
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search crafts..." className="pl-10 w-48 bg-background" />
          </div>
           
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/sell">
              <Users className="mr-2 h-4 w-4" /> Sell With Us
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-6 mt-8">
                   <Link href="/" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                      <ShoppingCart className="h-5 w-5" /> Marketplace
                    </Link>
                    <Link href="/artisans" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                      <Handshake className="h-5 w-5" /> Artisans Community
                    </Link>
                    <Link href="/stories" className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                      <BookOpen className="h-5 w-5" /> Stories & Heritage
                    </Link>
                     <Button variant="default" className="w-full mt-4" asChild>
                        <Link href="/sell">
                          <Users className="mr-2 h-4 w-4" /> Sell With Us
                        </Link>
                      </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
