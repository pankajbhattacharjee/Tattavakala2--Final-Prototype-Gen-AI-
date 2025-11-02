'use server';

/**
 * @fileOverview A product story generation AI agent.
 *
 * - generateProductStory - A function that handles the product story generation process.
 * - GenerateProductStoryInput - The input type for the generateProductStory function.
 * - GenerateProductStoryOutput - The return type for the generateProductStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductStoryInputSchema = z.object({
  photoUrl: z
    .string()
    .describe('A public URL of a photo of the product.'),
  productName: z.string().describe('The name of the product.'),
  locationContext: z.string().describe('The location (state/region) where the product is made.'),
  language: z.string().default('en').describe('The language for the generated story (e.g., en, es, fr).'),
});
export type GenerateProductStoryInput = z.infer<typeof GenerateProductStoryInputSchema>;

const GenerateProductStoryOutputSchema = z.object({
  story: z.string().describe('The generated product story.'),
});
export type GenerateProductStoryOutput = z.infer<typeof GenerateProductStoryOutputSchema>;

export async function generateProductStory(input: GenerateProductStoryInput): Promise<GenerateProductStoryOutput> {
  return generateProductStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductStoryPrompt',
  input: {schema: GenerateProductStoryInputSchema},
  output: {schema: GenerateProductStoryOutputSchema},
  prompt: `You are a master storyteller, crafting captivating narratives for artisanal products.

  Task:
  Create a compelling story for the following product, incorporating its name, origin, and visual details. Focus on evoking emotion and highlighting the craftsmanship. The story should be in the language: {{{language}}}.

  Product Name: {{{productName}}}
  Location Context: {{{locationContext}}}
  Product Photo: {{media url=photoUrl}}
  `,
});

const generateProductStoryFlow = ai.defineFlow(
  {
    name: 'generateProductStoryFlow',
    inputSchema: GenerateProductStoryInputSchema,
    outputSchema: GenerateProductStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
