import { credential } from 'firebase-admin';
import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';


const admin = getApps().length === 0 ? initializeApp({
  credential: credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
}) : getApp();

const db = getFirestore(admin);

const storageBucket = `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
const bucket = getStorage().bucket(storageBucket);

export { db, bucket };
