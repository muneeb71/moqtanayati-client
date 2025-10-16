"use client";

import { initializeApp, getApps } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCHX4xkQhj_DMMHb3xcNm5FejY82odfM7k",
  authDomain: "vorae-70496.firebaseapp.com",
  projectId: "vorae-70496",
  storageBucket: "vorae-70496.firebasestorage.app",
  messagingSenderId: "847303960399",
  appId: "1:847303960399:web:5dfff21c15f64cd536c73a",
  measurementId: "G-TK5GPYNDLR",
};

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export async function getMessagingIfSupported() {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
}
