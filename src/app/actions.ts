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
import { getFirebaseAdmin } from '@/firebase/firebase-admin';

export async function generateProductStory(
  input: GenerateProductStoryInput
): Promise<GenerateProductStoryOutput> {
  return await generateProductStoryFlow(input);
}

export async function translateProductStory(
  input: TranslateProductStoryInput
): Promise<TranslateProductStoryOutput> {
  return await translateProductStoryFlow(input);
}

export async function speechToText(
  input: SpeechToTextInput
): Promise<SpeechToTextOutput> {
  return await speechToTextFlow(input);
}

export async function placeOrder(userEmail: string | null) {
  if (!userEmail) {
    console.error('Order placement failed: User email not provided.');
    return { success: false, message: 'User not logged in.' };
  }
  console.log(`--- SIMULATING ORDER CONFIRMATION ---`);
  console.log(`Sending confirmation email to: ${userEmail}`);
  console.log(`Order Details: [Dummy Order Details]`);
  console.log(`--- SIMULATION COMPLETE ---`);

  return { success: true, message: 'Order placed successfully.' };
}

type UploadProductInput = {
  userId: string;
  userEmail: string;
  photoDataUri: string;
  productName: string;
  artisanName: string;
  price: number;
  category: string;
  locationContext: string;
  description: string;
};

export async function uploadProduct(
  input: UploadProductInput
): Promise<{ success: boolean; message: string }> {
  const {
    userId,
    userEmail,
    photoDataUri,
    productName,
    artisanName,
    price,
    category,
    locationContext,
    description,
  } = input;

  try {
    const { storage, firestore } = getFirebaseAdmin();
    const bucket = storage.bucket();

    // 1. Upload image from data URI
    const mimeType = photoDataUri.match(/data:(.*);base64,/)?.[1];
    if (!mimeType) {
      throw new Error('Invalid data URI.');
    }
    const base64Data = photoDataUri.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const fileExtension = mimeType.split('/')[1];
    const imagePath = `products/${userId}/${productName.replace(
      /\s+/g,
      '-'
    )}-${Date.now()}.${fileExtension}`;
    const file = bucket.file(imagePath);

    await file.save(imageBuffer, {
      metadata: { contentType: mimeType },
    });
    
    // Get public URL
    const [imageUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // Far-future expiration date
    });


    // 2. Prepare product data
    const productId = `prod_${userId.slice(0, 5)}_${Date.now()}`;
    const artisanDocRef = firestore.collection('artisans').doc(userId);
    const productDocRef = artisanDocRef.collection('products').doc(productId);

    const newProduct = {
      id: productId,
      artisanId: userId,
      name: productName,
      artisanName: artisanName,
      description: description,
      category: category,
      region: locationContext,
      price: price,
      image: {
        src: imageUrl,
        hint: productName.toLowerCase().split(' ').slice(0, 2).join(' '),
      },
    };

    // 3. Save data to Firestore in a batch
    const batch = firestore.batch();
    batch.set(
      artisanDocRef,
      { id: userId, name: artisanName, contactEmail: userEmail },
      { merge: true }
    );
    batch.set(productDocRef, newProduct);

    await batch.commit();

    return { success: true, message: 'Product published successfully!' };
  } catch (error: any) {
    console.error('Failed to publish product:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred.',
    };
  }
}
