'use server';

import type {
  GenerateProductStoryInput,
  GenerateProductStoryOutput,
  SpeechToTextInput,
  SpeechToTextOutput,
  TranslateProductStoryInput,
  TranslateProductStoryOutput,
} from '@/ai/flows';
import {
  generateProductStoryFlow,
  translateProductStoryFlow,
} from '@/ai/flows/generate-product-story';
import {speechToTextFlow} from '@/ai/flows/speech-to-text';

// This is the base URL for the Genkit flows API.
// In development, it points directly to the local Genkit server.
// In production, it would point to the deployed Cloud Run service URL.
const GENKIT_API_BASE =
  process.env.GENKIT_API_BASE || 'http://127.0.0.1:3400/flows';

async function callGenkitFlow<T_IN, T_OUT>(
  flowId: string,
  input: T_IN
): Promise<T_OUT> {
  const url = `${GENKIT_API_BASE}/${flowId}`;
  console.log(`Calling Genkit flow at: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({input}),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Genkit flow '${flowId}' failed with status ${response.status}:`,
        errorBody
      );
      throw new Error(`Request to AI flow failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.output as T_OUT;
  } catch (error) {
    console.error(`Error calling Genkit flow '${flowId}':`, error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
}

export async function generateProductStory(
  input: GenerateProductStoryInput
): Promise<GenerateProductStoryOutput> {
  // The flow is now called directly as a function, avoiding network issues.
  return await generateProductStoryFlow(input);
}

export async function translateProductStory(
  input: TranslateProductStoryInput
): Promise<TranslateProductStoryOutput> {
  // The flowId here must match the 'name' of the flow defined with `ai.defineFlow`
  return await callGenkitFlow('translateProductStoryFlow', input);
}

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  return await speechToTextFlow(input);
}

export async function placeOrder(userEmail: string | null) {
  if (!userEmail) {
    console.error('Order placement failed: User email not provided.');
    return {success: false, message: 'User not logged in.'};
  }

  // In a real application, you would add logic here to:
  // 1. Save the order to a database.
  // 2. Process payment with a payment gateway.
  // 3. Send a real confirmation email using a service like SendGrid, Resend, or Nodemailer.

  console.log(`--- SIMULATING ORDER CONFIRMATION ---`);
  console.log(`Sending confirmation email to: ${userEmail}`);
  console.log(`Order Details: [Dummy Order Details]`);
  console.log(`--- SIMULATION COMPLETE ---`);

  return {success: true, message: 'Order placed successfully.'};
}
