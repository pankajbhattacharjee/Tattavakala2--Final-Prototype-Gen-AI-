"use client";

import { useState } from "react";
import Image from "next/image";
import { Languages, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { StoryState } from "./crafting-tale-app";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { translateStoryAction } from "@/app/actions";
import { languages } from "@/lib/types";

type StoryDisplayProps = {
  isLoading: boolean;
  error: string | null;
  storyState: StoryState | null;
};

export default function StoryDisplay({
  isLoading,
  error,
  storyState,
}: StoryDisplayProps) {
  const { toast } = useToast();
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState<string>('');
  const [translatedStory, setTranslatedStory] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!storyState?.story || !targetLang) {
      toast({
        variant: "destructive",
        title: "Translation Error",
        description: "Original story or target language is missing.",
      });
      return;
    }

    setIsTranslating(true);
    setTranslatedStory(null);

    try {
      const result = await translateStoryAction({ story: storyState.story, language: targetLang });

      if ("error" in result) {
        throw new Error(result.error);
      }
      
      const selectedLanguage = languages.find(l => l.value === targetLang);
      toast({
        title: "Success",
        description: `Story translated to ${selectedLanguage?.label || 'the selected language'}.`
      });
      setTranslatedStory(result.translatedStory);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Translation Failed",
        description: errorMessage,
      });
    } finally {
      setIsTranslating(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-48 rounded-lg mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!storyState) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[500px] lg:h-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Story Awaits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Fill out the form to generate a unique story for your product. The tale of its creation will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{storyState.productName}</CardTitle>
        <CardDescription>An AI-generated tale</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {storyState.imagePreview && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <Image
              src={storyState.imagePreview}
              alt={storyState.productName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {translatedStory || storyState.story}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Select onValueChange={setTargetLang}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Translate to..." />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleTranslate} disabled={isTranslating || !targetLang} className="w-full sm:w-auto">
            {isTranslating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Languages className="mr-2 h-4 w-4" />
            )}
            Translate
          </Button>
      </CardFooter>
    </Card>
  );
}
