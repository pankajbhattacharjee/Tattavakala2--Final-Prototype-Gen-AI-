'use server';

import { generateProductStory as genStory, translateProductStory as transStory } from '@/ai/flows';
import type { GenerateProductStoryInput, TranslateProductStoryInput } from '@/ai/flows';

export async function generateProductStory(input: GenerateProductStoryInput) {
    return await genStory(input);
}

export async function translateProductStory(input: TranslateProductStoryInput) {
    return await transStory(input);
}
