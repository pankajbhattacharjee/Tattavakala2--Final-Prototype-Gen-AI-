'use server';
import * as admin from 'firebase-admin';

let app: admin.app.App | null = null;

function getFirebaseAdmin() {
  if (app) {
    return {
      firestore: admin.firestore(app),
      storage: admin.storage(app),
      auth: admin.auth(app),
    };
  }

  if (admin.apps.length > 0) {
    app = admin.app();
    return {
      firestore: admin.firestore(app),
      storage: admin.storage(app),
      auth: admin.auth(app),
    };
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable not set.');
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable not set.');
  }

  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
      storageBucket: `${projectId}.appspot.com`,
    });
  } catch (error: any) {
    if (error.code !== 'app/duplicate-app') {
      throw error;
    }
    app = admin.app();
  }
  
  return {
    firestore: admin.firestore(app),
    storage: admin.storage(app),
    auth: admin.auth(app),
  };
}

export { getFirebaseAdmin };
