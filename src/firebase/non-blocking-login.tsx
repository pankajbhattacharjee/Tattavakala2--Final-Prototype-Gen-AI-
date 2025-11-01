'use client';
import {
  Auth, 
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

/**
 * Initiates Google sign-in using a popup.
 * IMPORTANT: This function MUST be called directly within an 'async' user interaction event handler
 * (e.g., an 'async function' connected to a button's onClick), and 'awaited' immediately.
 */
export async function initiateGoogleSignIn(authInstance: Auth): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  // This will force the account chooser to appear every time.
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    // This is the CRITICAL call. It must execute as a direct consequence
    // of the user's synchronous click event handler, by being awaited
    // immediately in an async handler.
    const result = await signInWithPopup(authInstance, provider);
    return result;
  } catch (error: any) {
    // Log the error internally and re-throw so the caller can handle it.
    console.error("Error during signInWithPopup:", error.code, error.message);
    throw error; // Re-throw to propagate to the calling function's catch block
  }
}

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // Ensure createUserWithEmailAndPassword is imported from 'firebase/auth'
  createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // Ensure signInWithEmailAndPassword is imported from 'firebase/auth'
  signInWithEmailAndPassword(authInstance, email, password);
}
