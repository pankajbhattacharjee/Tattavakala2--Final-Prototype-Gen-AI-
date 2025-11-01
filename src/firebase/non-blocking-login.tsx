
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): Promise<UserCredential | void> {
  const provider = new GoogleAuthProvider();
  // CRITICAL: This call must be triggered by a direct user interaction (e.g., a click).
  // We return the promise so the caller can know when the process is complete (e.g., to stop a loading spinner).
  return signInWithPopup(authInstance, provider)
    .then((result) => {
      // Successful sign-in. The onAuthStateChanged listener will handle the user state update.
      return result;
    })
    .catch((error) => {
      // This catches errors from the popup flow, such as user closing the popup or the popup being blocked.
      if (error.code === 'auth/popup-blocked') {
        console.error("Google Sign-In Error: Popup was blocked by the browser. Please allow popups for this site.");
        // Optionally, inform the user via a toast or an alert.
      } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        console.error("Google Sign-In Error:", error);
      }
      // We re-throw the error so the caller's .finally() or .catch() will trigger.
      throw error;
    });
}


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
