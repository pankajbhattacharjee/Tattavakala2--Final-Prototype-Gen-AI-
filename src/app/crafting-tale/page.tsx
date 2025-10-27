import CraftingTaleApp from '@/components/crafting-tale-app';
import Header from '@/components/header';

export default function CraftingTalePage() {
  return (
    <div className="bg-background min-h-screen">
        <Header />
        <main className="p-4 sm:p-6 md:p-8">
            <CraftingTaleApp />
        </main>
    </div>
  );
}
