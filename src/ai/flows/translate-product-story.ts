'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating product stories into multiple languages.
 *
 * translateProductStory - A function that translates a product story into a specified language.
 * TranslateProductStoryInput - The input type for the translateProductStory function.
 * TranslateProductStoryOutput - The return type for the translateProductStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateProductStoryInputSchema = z.object({
  story: z.string().describe('The product story to translate.'),
  language: z.string().describe('The target language for the translation.'),
});
export type TranslateProductStoryInput = z.infer<typeof TranslateProductStoryInputSchema>;

const TranslateProductStoryOutputSchema = z.object({
  translatedStory: z.string().describe('The translated product story.'),
});
export type TranslateProductStoryOutput = z.infer<typeof TranslateProductStoryOutputSchema>;

export async function translateProductStory(
  input: TranslateProductStoryInput
): Promise<TranslateProductStoryOutput> {
  return translateProductStoryFlow(input);
}

const translateProductStoryPrompt = ai.definePrompt({
  name: 'translateProductStoryPrompt',
  input: {schema: TranslateProductStoryInputSchema},
  output: {schema: TranslateProductStoryOutputSchema},
  prompt: `Translate the following product story into {{language}}:\n\n{{{story}}}`,
});

const translateProductStoryFlow = ai.defineFlow(
  {
    name: 'translateProductStoryFlow',
    inputSchema: TranslateProductStoryInputSchema,
    outputSchema: TranslateProductStoryOutputSchema,
  },
  async input => {
    const {output} = await translateProductStoryPrompt(input);
    return output!;
  }
);
