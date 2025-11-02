'use server';

import type {
  GenerateProductStoryInput,
  GenerateProductStoryOutput,
  SpeechToTextInput,
  SpeechToTextOutput,
  TranslateProductStoryInput,
  TranslateProductStoryOutput,
} from '@/ai/flows';
import { generateProductStoryFlow } from '@/ai/flows';
import { speechToTextFlow } from '@/ai/flows/speech-to-text';
import { translateProductStoryFlow } from '@/ai/flows/translate-product-story';


export async function generateProductStory(
  input: GenerateProductStoryInput
): Promise<GenerateProductStoryOutput> {
  return await generateProductStoryFlow(input);
}

export async function translateProductStory(
  input: TranslateProductStoryInput
): Promise<TranslateProductStoryOutput> {
  return await translateProductStoryFlow(input);
}

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  return await speechToTextFlow(input);
}
