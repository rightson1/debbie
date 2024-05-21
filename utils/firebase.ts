import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAGVKYBTKjobJ7vDpezEnwEpMm5HD2MFXI",
  authDomain: "debbie-2386f.firebaseapp.com",
  projectId: "debbie-2386f",
  storageBucket: "debbie-2386f.appspot.com",
  messagingSenderId: "479429038163",
  appId: "1:479429038163:web:ccf809b97bb4b993f2b6a6",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
