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
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productName: z.string().describe('The name of the product.'),
  locationContext: z
    .string()
    .describe('The location (state/region) where the product is made.'),
  language: z
    .string()
    .default('en')
    .describe('The language for the generated story (e.g., en, es, fr).'),
});
export type GenerateProductStoryInput = z.infer<
  typeof GenerateProductStoryInputSchema
>;

const SocialCaptionSchema = z.object({
  platform: z.enum(['instagram', 'facebook']),
  caption: z.string(),
  hashtags: z.string(),
});
export type SocialCaption = z.infer<typeof SocialCaptionSchema>;

const GenerateProductStoryOutputSchema = z.object({
  story: z.string().describe('The generated product story.'),
  captions: z
    .array(SocialCaptionSchema)
    .describe('An array of generated social media captions.'),
});
export type GenerateProductStoryOutput = z.infer<
  typeof GenerateProductStoryOutputSchema
>;

export async function generateProductStory(
  input: GenerateProductStoryInput
): Promise<GenerateProductStoryOutput> {
  return generateProductStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductStoryPrompt',
  input: {schema: GenerateProductStoryInputSchema},
  output: {schema: GenerateProductStoryOutputSchema},
  prompt: `You are a master storyteller and social media expert, crafting captivating narratives for artisanal products.

  Task:
  1. Create a compelling story for the following product, incorporating its name, origin, and visual details. Focus on evoking emotion and highlighting the craftsmanship. The story should be in the language: {{{language}}}.
  2. Generate 2 social media captions (one for Instagram, one for Facebook) to promote the product. The captions should be engaging, in the language {{{language}}}, and include relevant hashtags.

  Product Name: {{{productName}}}
  Location Context: {{{locationContext}}}
  Product Photo: {{media url=photoDataUri}}
  `,
});

export const generateProductStoryFlow = ai.defineFlow(
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
