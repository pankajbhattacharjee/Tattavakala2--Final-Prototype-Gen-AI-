'use server';

import {
  generateProductStory as genStory,
  translateProductStory as transStory,
  speechToText as spToText,
} from '@/ai/flows';
import type {
  GenerateProductStoryInput,
  TranslateProductStoryInput,
  SpeechToTextInput,
} from '@/ai/flows';

export async function generateProductStory(input: GenerateProductStoryInput) {
  return await genStory(input);
}

export async function translateProductStory(input: TranslateProductStoryInput) {
  return await transStory(input);
}

export async function speechToText(input: SpeechToTextInput) {
  return await spToText(input);
}
