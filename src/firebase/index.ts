'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FILE

// This is the recommended approach for initializing Firebase in a Next.js app.
// It works for both server-side and client-side rendering.
if (!firebaseConfig.projectId) {
  throw new Error("Firebase config is incomplete. Check your firebase/config.ts file.");
}

const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(firebaseApp);
const firestore: Firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore };

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
