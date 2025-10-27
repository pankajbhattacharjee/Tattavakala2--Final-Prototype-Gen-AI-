import { Store, CheckCircle, BookOpen, Lightbulb, Star, MessageSquare, Facebook, Twitter, Instagram, Heart } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';

export default function Footer() {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', 'aria-label': 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', 'aria-label': 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', 'aria-label': 'Twitter' },
  ];

  return (
    <footer className="bg-secondary/50 text-foreground">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          {/* Sell With Us */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-base text-primary">Sell With Us (For Artisans)</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <span>Step 1: Upload craft photo.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <span>Step 2: Add short description (AI enhances it).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <span>Step 3: Auto-generate tags, prices, and story.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <span>Step 4: Preview how your product will look in the marketplace.</span>
              </li>
            </ul>
          </div>

          {/* Community & Learning */}
          <div>
            <h3 className="font-semibold text-base text-primary mb-4">Community & Learning</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>AI-curated articles about craft heritage.</span>
              </li>
              <li className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 shrink-0" />
                <span>"Did You Know?" section (AI facts about Indian art forms).</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 shrink-0" />
                <span>Artisan spotlight stories.</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>Forum for artisans to discuss materials, pricing, etc.</span>
              </li>
            </ul>
          </div>

          {/* About / Impact */}
          <div>
            <h3 className="font-semibold text-base text-primary mb-4">About / Impact</h3>
            <p className="text-muted-foreground mb-3">Mission: "Preserving Heritage with Technology."</p>
            <p className="text-muted-foreground mb-3">Showcase artisans supported, sales made, and stories shared.</p>
            <p className="text-muted-foreground mb-4">Option for users to sponsor or donate to artisans.</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link key={link.href} href={link.href} aria-label={link['aria-label']} className="text-muted-foreground hover:text-primary">
                  {link.icon}
                </Link>
              ))}
                <a href="#" aria-label="Pinterest" className="text-muted-foreground hover:text-primary">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
                        <title>Pinterest</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.027-.655 2.56-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.159-1.492-.695-2.433-2.878-2.433-4.646 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tattvakala. All rights reserved. | Handcrafted with <Heart className="inline h-3 w-3 text-red-500 fill-red-500" /> in India
        </div>
      </div>
    </footer>
  );
}
