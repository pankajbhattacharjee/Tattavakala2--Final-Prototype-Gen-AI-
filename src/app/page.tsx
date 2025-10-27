import CraftingTaleApp from '@/components/crafting-tale-app';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <CraftingTaleApp />
      </main>
    </div>
  );
}
