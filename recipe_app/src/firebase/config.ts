import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getMessaging} from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMRr_JDlJ3HEEnonhoMTjjtz85veVt_Os",
    authDomain: "my-recipe-app-72535.firebaseapp.com",
    projectId: "my-recipe-app-72535",
    storageBucket: "my-recipe-app-72535.appspot.com",
    messagingSenderId: "243345150702",
    appId: "1:243345150702:web:1ae28b49f7cf67154d59ff",
    databaseURL: "https://my-recipe-app-72535-default-rtdb.europe-west1.firebasedatabase.app/",
    measurementId: "G-1YZTBY36LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getDatabase(app);
export const cloudFS = getFirestore(app);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);
export default app;