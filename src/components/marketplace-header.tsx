import Link from 'next/link';
import { Search, ShoppingCart, User, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function MarketplaceHeader() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex flex-col">
              <h1 className="text-3xl font-bold text-foreground tracking-wider">
                Tattvakala
              </h1>
              <p className="text-sm text-muted-foreground">
                Authentic Handcrafted Treasures
              </p>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">
                Marketplace
              </Link>
              <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Artisans Community
              </Link>
              <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Stories & Heritage
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex">
              <Users className="mr-2 h-4 w-4" /> Sell With Us
            </Button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search crafts..." className="pl-10 w-48" />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
