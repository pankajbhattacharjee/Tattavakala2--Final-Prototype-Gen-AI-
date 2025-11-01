import { config } from 'dotenv';
config();

// This file is the entry point for the Genkit development server.
// By importing the flow files here, we register them with Genkit
// so they can be discovered and called as API endpoints.
import '@/ai/flows/generate-product-story';
import '@/ai/flows/translate-product-story';
import '@/ai/flows/speech-to-text';
