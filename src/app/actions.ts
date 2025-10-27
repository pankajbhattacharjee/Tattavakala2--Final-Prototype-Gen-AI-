"use server";

import { generateProductStory, translateProductStory } from "@/ai/flows";
import type {
  GenerateProductStoryInput,
  TranslateProductStoryInput,
} from "@/ai/flows";

export async function generateStoryAction(
  input: GenerateProductStoryInput
): Promise<{ story: string } | { error: string }> {
  try {
    const result = await generateProductStory(input);
    if (!result.story) {
      throw new Error("Failed to generate a story. The result was empty.");
    }
    return { story: result.story };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Story generation failed: ${errorMessage}` };
  }
}

export async function translateStoryAction(
  input: TranslateProductStoryInput
): Promise<{ translatedStory: string } | { error: string }> {
  try {
    const result = await translateProductStory(input);
    if (!result.translatedStory) {
      throw new Error("Failed to translate the story. The result was empty.");
    }
    return { translatedStory: result.translatedStory };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Translation failed: ${errorMessage}` };
  }
}
