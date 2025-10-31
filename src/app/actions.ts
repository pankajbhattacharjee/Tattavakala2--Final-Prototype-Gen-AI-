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


export async function placeOrder(userEmail: string | null) {
    if (!userEmail) {
        console.error("Order placement failed: User email not provided.");
        return { success: false, message: "User not logged in." };
    }
    
    // In a real application, you would add logic here to:
    // 1. Save the order to a database.
    // 2. Process payment with a payment gateway.
    // 3. Send a real confirmation email using a service like SendGrid, Resend, or Nodemailer.
    
    console.log(`--- SIMULATING ORDER CONFIRMATION ---`);
    console.log(`Sending confirmation email to: ${userEmail}`);
    console.log(`Order Details: [Dummy Order Details]`);
    console.log(`--- SIMULATION COMPLETE ---`);

    return { success: true, message: "Order placed successfully." };
}
