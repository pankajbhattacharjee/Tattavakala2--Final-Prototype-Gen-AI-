'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const SpeechToTextInputSchema = z.object({
  audio: z.string().describe('Base64 encoded audio data'),
});
export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;

const SpeechToTextOutputSchema = z.object({
  text: z.string().describe('Transcribed text'),
});
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  return speechToTextFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: [
        {
          text: 'Transcribe the following audio. The audio is about an artisan describing their product.',
        },
        {media: {url: `data:audio/wav;base64,${input.audio}`}},
      ],
    });
    return {text};
  }
);
