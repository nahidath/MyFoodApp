import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import {getMessaging} from "firebase/messaging";
import Constants from "expo-constants";

// @ts-ignore
import {REACT_APP_API_KEY2, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID, REACT_APP_MEASUREMENT_ID,REACT_APP_DATABASE_URL } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: REACT_APP_API_KEY2,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    databaseURL: REACT_APP_DATABASE_URL,
    measurementId: REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getDatabase(app);
// export const cloudFS = getFirestore(app);
export const cloudFS = initializeFirestore(app, { experimentalForceLongPolling: true });
// export const messaging = getMessaging(app);

// const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export default app;