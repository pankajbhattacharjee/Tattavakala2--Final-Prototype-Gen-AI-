
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FILE

// This is the recommended approach for initializing Firebase in a Next.js app.
// It works for both server-side and client-side rendering.
// Only check config during runtime, not during build/prerendering
// Initialize Firebase services when config is available. We allow initialization
// on server or client as long as firebaseConfig contains a projectId. This keeps
// the provider hooks functional during prerender and avoids throwing.
let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

if (firebaseConfig && firebaseConfig.projectId) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp!);
  firestore = getFirestore(firebaseApp!);
} else {
  // Config missing — don't initialize, but warn so builds don't fail.
  // eslint-disable-next-line no-console
  console.warn('Firebase config is incomplete. Check your .env file and ensure NEXT_PUBLIC_ variables are set.');
}

export { firebaseApp, auth, firestore };

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
