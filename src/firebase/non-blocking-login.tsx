
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate Google Sign-In (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider).catch((error: unknown) => {
    // This is a common scenario and not a "real" error.
    // The user simply closed the popup before completing the flow.
    // We can safely ignore it and don't need to show an error message.
    if (error instanceof FirebaseError && error.code === 'auth/popup-closed-by-user') {
      return;
    }
    // For any other errors, we can log them if needed.
    console.error("Google sign-in error:", error);
  });
}
