import { Feather } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex justify-center items-center py-6 px-4 border-b">
      <div className="flex items-center gap-3 text-foreground">
        <Feather className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline tracking-wider">
          Crafting Tale
        </h1>
      </div>
    </header>
  );
}
