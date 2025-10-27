"use client";

import { useState } from 'react';
import StoryForm from './story-form';
import StoryDisplay from './story-display';

export type StoryState = {
  story: string;
  productName: string;
  imagePreview: string;
};

export default function CraftingTaleApp() {
  const [storyState, setStoryState] = useState<StoryState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <StoryForm
        setIsLoading={setIsLoading}
        setError={setError}
        setStoryState={setStoryState}
      />
      <StoryDisplay
        isLoading={isLoading}
        error={error}
        storyState={storyState}
      />
    </div>
  );
}
