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
  try {
    // Directly invoke the AI flow function
    return await generateProductStoryFlow(input);
  } catch (error: any) {
    console.error('[AI] Generate Product Story Failed:', error);
    // Re-throw a more user-friendly error or a generic one to be caught by the client
    throw new Error(`Failed to generate product story: ${error.message}`);
  }
}

export async function translateProductStory(
  input: TranslateProductStoryInput
): Promise<TranslateProductStoryOutput> {
  try {
    return await translateProductStoryFlow(input);
  } catch (error: any) {
    console.error('[AI] Translate Product Story Failed:', error);
    throw new Error(`Failed to translate product story: ${error.message}`);
  }
}

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  try {
    return await speechToTextFlow(input);
  } catch (error: any) {
    console.error('[AI] Speech to Text Failed:', error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}
